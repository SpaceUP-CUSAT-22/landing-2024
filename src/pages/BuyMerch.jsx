import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import emailjs from "@emailjs/browser";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

// const qrCodes = {
//   'cusatian': '/qrcode.png',
//   'noncusatian': '/qrcode.png',
//   'seds': '/qrcode.png'
// }

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const BuyMerch = () => {

  const [toast, setToast] = React.useState({
    value: false,
    color: "green",
    message: "Order submitted successfully! Check your email for the token.",
  });
  const [price, setPrice] = React.useState(0);

  useEffect(() => {
    if (toast.value) {
      setTimeout(() => {
        setToast((prevToast) => ({
          ...prevToast,
          value: false,
        }));
      }, 5000);
    }
  }, [toast]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    size: "Small",
    address: "",
    file: null,
    whiteShirt: 0,
    orangeShirt: 0,
    hoodie: 0,
    blackHoodie: 0,
  });
  const [checkbox, setCheckBox] = useState(false);

  useEffect(() => {
    let basePrice = 0;
    basePrice += formData.whiteShirt * 349;
    basePrice += formData.orangeShirt * 349;
    basePrice += formData.hoodie * 769;
    basePrice += formData.blackHoodie * 769;

    let newPrice = basePrice;

    if (checkbox) {
      newPrice += 60;
    }

    setPrice(Math.round(newPrice));
  }, [formData.whiteShirt, formData.orangeShirt, formData.hoodie, formData.blackHoodie, checkbox]);

  const [isLoading, setIsLoading] = useState(false);
  const [viewSize, setViewSize] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };


 

  const generateToken = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const sendEmail = (email, name, token) => {
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICEID,
        import.meta.env.VITE_EMAILJS_TEMPLATEID,
        {
          to_email: email,
          reply_to: "sedscusat@gmail.com",
          to_name: name,
          from_name: "SEDS",
          token: token,
        },
        import.meta.env.VITE_EMAILJS_USERID,
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
        },
        (error) => {
          console.error("Error sending email:", error.text);
        },
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if at least one T-shirt is selected
    if (!formData.whiteShirt && !formData.orangeShirt && !formData.hoodie) {
      setToast({
        value: true,
        color: "red",
        message: "Please select at least one T-shirt (White or Black).",
      });
      setIsLoading(false);
      return;
    }


    try {
      // Check for duplicate entries
      const q = query(
        collection(db, "merchorders"),
        where("email", "==", formData.email),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // alert("An order with this email already exists!");
        setToast({
          value: true,
          color: "red",
          message: "An order with this email already exists!",
        });
        setIsLoading(false);
        return;
      }

      // Upload file to Firebase Storage
      let fileUrl = "";
      if (formData.file) {
        const storageRef = ref(
          storage,
          `payment_screenshots/${formData.email}_${formData.file.name}`,
        );
        await uploadBytes(storageRef, formData.file);
        fileUrl = await getDownloadURL(storageRef);
      }

      // Generate token
      const token = generateToken();

      // Add data to Firestore
      await addDoc(collection(db, "merchorders"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        size: formData.size,
        paymentScreenshot: fileUrl,
        timestamp: new Date(),
        address: formData.address,
        price,
        token: token,
        whiteShirt: formData.whiteShirt,
        orangeShirt: formData.orangeShirt,
        hoodie: formData.hoodie,
        blackHoodie: formData.blackHoodie,
      });

      // Send email
      sendEmail(formData.email, formData.name, token);

      //   alert("Order submitted successfully! Check your email for the token.");
      setToast({
        value: true,
        color: "green",
        message:
          "Order submitted successfully! Check your email for the token.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        size: "Small",
        // cusatian: 'Are you a CUSATian',
        file: null,
        whiteShirt: 0,
        orangeShirt: 0,
        hoodie: 0,
        blackHoodie: 0,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      //   alert("An error occurred. Please try again.");
      setToast({
        value: true,
        color: "red",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGPayRedirect = () => {
    if (window.innerWidth >= 768) {
      setToast({
        value: true,
        color: "red",
        message:
          "Sorry! This feature is only available on mobile devices. Please scan the QR code",
      });
    }
    const receiverUPI = "pranavjayasurya0203@oksbi";
    const note = "Payment for Tshirt";
    const name = "SEDS";

    const upiUrl = `upi://pay?pa=${receiverUPI}&pn=${encodeURIComponent(name)}&am=${price}&cu=INR&tn=${encodeURIComponent(note)}`;

    console.log(upiUrl);

    window.location.href = upiUrl;
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setCheckBox(checked);
  };

  const upiid = "pranavjayasurya0203@oksbi";

  const handleCopy = () => {
    navigator.clipboard.writeText(upiid).then(
      () => {
        console.log("Email copied to clipboard!");
        setToast({
          value: true,
          color: "green",
          message: "UPI ID copied to clipboard!",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
      },
    );
  };

  // QuantitySelector Component
const QuantitySelector = ({ name, value, onChange, label, price }) => {
  const handleDecrement = () => {
    if (value > 0) {
      onChange(name, value - 1);
    }
  };

  const handleIncrement = () => {
    onChange(name, value + 1);
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="exo text-white flex-1">{label} (₹{price})</span>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleDecrement}
          className="exo bg-gray-700 text-white px-3 py-1 rounded-l-lg hover:bg-gray-600 transition"
        >
          -
        </button>
        <input
          type="text"
          readOnly
          value={value}
          className="exo w-12 text-center bg-gray-800 text-white border-t border-b border-gray-700"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="exo bg-gray-700 text-white px-3 py-1 rounded-r-lg hover:bg-gray-600 transition"
        >
          +
        </button>
      </div>
    </div>
  );
};

// Integrate into the BuyMerch component's form
const BuyMerch = () => {
  // ... existing state and handlers ...

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black py-20">
      {/* ... existing content ... */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex w-full flex-col rounded-lg bg-black bg-opacity-50 px-4 py-10 pt-5 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row">
            {/* ... existing image rendering ... */}
          </div>

          <div className="space-y-6">
            <p className="text-sm text-green-400">
              * Please note: T-shirts may not be available on the event day
              and could be delivered to your address instead.
            </p>
            
            {/* Quantity Selectors */}
            <QuantitySelector
              name="whiteShirt"
              value={formData.whiteShirt}
              onChange={(name, value) =>
                setFormData((prev) => ({ ...prev, [name]: value }))
              }
              label="White T-shirt"
              price={349}
            />
            
            <QuantitySelector
              name="orangeShirt"
              value={formData.orangeShirt}
              onChange={(name, value) =>
                setFormData((prev) => ({ ...prev, [name]: value }))
              }
              label="Black T-shirt"
              price={349}
            />
            
            <QuantitySelector
              name="hoodie"
              value={formData.hoodie}
              onChange={(name, value) =>
                setFormData((prev) => ({ ...prev, [name]: value }))
              }
              label="Hoodie"
              price={769}
            />
            
            <QuantitySelector
              name="blackHoodie"
              value={formData.blackHoodie}
              onChange={(name, value) =>
                setFormData((prev) => ({ ...prev, [name]: value }))
              }
              label="Black Hoodie"
              price={769}
            />
            
            {/* Rest of your form fields */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="exo w-full rounded-lg bg-[#050B17] p-2 text-white"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="exo w-full rounded-lg bg-[#050B17] p-2 text-white"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="exo w-full rounded-lg bg-[#050B17] p-2 text-white"
              required
            />
            
            {/* ... rest of the form ... */}
          </div>
        </div>
      </form>
      {/* ... existing content ... */}
    </div>
  );
};


  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black py-20">
      {/* Toast Notification */}
      <div
        className={`fixed left-1/2 top-10 z-[101] -translate-x-1/2 transition duration-300 ease-in ${toast.value ? "opacity-100" : "opacity-0"}`}
      >
        <div className={`rounded bg-orange-500 px-10 py-5`}>
          <p className="exo text-center text-white">{toast.message}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:px-10">
        <img src="/logo.svg" className="mx-auto mb-8 w-80" alt="logo" />

        <h1
          className="font-alternox-regular mb-8 text-center text-4xl font-bold tracking-wider text-white sm:text-4xl md:text-7xl"
          style={{
            textShadow: "0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080",
            transform: "scaleX(1.2)",
          }}
        >
          BUY MERCH
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex w-full flex-col rounded-lg bg-black bg-opacity-50 px-4 py-10 pt-5 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row flex-wrap">
              {formData.orangeShirt > 0 && (
                <img
                  src="/black.png"
                  className="mb-10 h-auto w-[350px] max-w-[40rem]"
                  alt="tshirt"
                />
              )}
              {formData.whiteShirt > 0 && (
                <img
                  src="/white.png"
                  className="mb-10 h-auto w-[350px] max-w-[40rem]"
                  alt="tshirt"
                />
              )}
              {formData.hoodie > 0 && (
                <>
                  <img
                    src="/hoodie.png"
                    className="mb-10 h-auto w-[350px] max-w-[40rem]"
                    alt="hoodie"
                  />
                  <img
                    src="/hoodie2.png"
                    className="mb-10 h-auto w-[350px] max-w-[40rem]"
                    alt="hoodie"
                  />
                </>
              )}
              {formData.blackHoodie > 0 && (
                <>
                  <img
                    src="/blackhoodie.png"
                    className="mb-10 h-auto w-[350px] max-w-[40rem]"
                    alt="black hoodie"
                  />
                  <img
                    src="/blackhoodie2.png"
                    className="mb-10 h-auto w-[350px] max-w-[40rem]"
                    alt="black hoodie back"
                  />
                </>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-sm text-green-400">
                * Please note: T-shirts may not be available on the event day
                and could be delivered to your address instead.{" "}
              </p>
              <div className="flex flex-col space-y-2">
              <QuantitySelector
    name="whiteShirt"
    value={formData.whiteShirt}
    onChange={(name, value) =>
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    label="White T-shirt"
    price={349}
  />
  
  <QuantitySelector
    name="orangeShirt"
    value={formData.orangeShirt}
    onChange={(name, value) =>
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    label="Black T-shirt"
    price={349}
  />
  
  <QuantitySelector
    name="hoodie"
    value={formData.hoodie}
    onChange={(name, value) =>
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    label="Hoodie"
    price={769}
  />
  
  <QuantitySelector
    name="blackHoodie"
    value={formData.blackHoodie}
    onChange={(name, value) =>
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    label="Black Hoodie"
    price={769}
  />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="exo w-full rounded-lg bg-[#050B17] p-2 text-white"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="exo w-full rounded-lg bg-[#050B17] p-2 text-white"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="exo w-full rounded-lg bg-[#050B17] p-2 text-white"
                required
              />

              <div className="flex justify-between">
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="exo w-[80%] rounded-lg bg-[#050B17] p-2 text-white"
                  required
                >
                  <option>Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
                <button
                  type="button"
                  onClick={() => setViewSize((prevState) => !prevState)}
                  className="exo rounded-lg bg-blue-500 p-2 text-white"
                >
                  {viewSize ? "Hide Size Chart" : "View Size Chart"}
                </button>
              </div>
              {viewSize && (
                <img
                  src="/sizechart.jpg"
                  className="m-auto mt-4 h-auto w-full max-w-[20rem]"
                  alt="sizechart"
                />
              )}
              {/* <select name="cusatian" value={formData.cusatian} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required>
                      <option>Are you a ...?</option>
                      <option value="seds">SEDS Member</option>
                      <option value="nonseds">Non SEDS Member</option>
                    </select> */}
              {/* {formData.cusatian == 'nonseds' && */}
              <div className="flex items-center">
                <input
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  name="delivery"
                  value="delivery"
                  className="exo mr-5 rounded-lg bg-[#050B17] p-5 text-white"
                />
                <label htmlFor="" className="exo text-white">
                  Home delivery required
                </label>
              </div>
              {/* } */}

              <textarea
                name="address"
                onChange={handleInputChange}
                className="exo w-full rounded-lg bg-[#050B17] p-2 text-white"
                placeholder="Please enter your address"
                required
              ></textarea>
              
            </div>
            <button
              onClick={handleGPayRedirect}
              type="button"
              className="exo mt-6 rounded-lg bg-red-500 p-2 text-white"
            >
              Pay ₹ {price}
            </button>
            <span className="exo mt-4 text-center text-white">OR</span>
            <span className="exo mt-4 text-center text-white">
              Scan the QR code below and pay ₹ {price} to{" "}
              <span
                onClick={handleCopy}
                style={{ cursor: "pointer" }}
                className="rounded-lg bg-[#050B17] p-1 text-blue-500"
                title="Click to copy"
              >
                {upiid}
                <i class="fa-solid fa-copy ml-3"></i>
              </span>
            </span>
            <img
              src="/qrcode.png"
              className="m-auto mt-4 h-auto w-full max-w-[20rem] cursor-pointer"
              alt="gpay"
            />
            <label className="exo mt-6 text-white">
              Upload screenshot of payment
            </label>
            <input
              type="file"
              name="file"
              onChange={handleInputChange}
              className="exo mt-2 w-full rounded-lg bg-[#050B17] p-2 text-white"
              required
            />
            <button
              type="submit"
              className="exo mt-6 flex w-full items-center justify-center rounded-lg bg-purple-700 p-3 text-xl font-bold text-white transition-all duration-300 hover:bg-purple-600"
              disabled={isLoading}
              style={{
                textShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #800080",
                boxShadow: "0 0 15px #800080",
              }}
            >
              {isLoading ? (
                <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? "Processing..." : "Submit Order"}
            </button>
          </div>
        </form>
      </div>

      {/* Background Elements */}
      <div className="absolute left-0 top-0 z-0 h-full w-full overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
    </div>
  );
};

export default BuyMerch;
