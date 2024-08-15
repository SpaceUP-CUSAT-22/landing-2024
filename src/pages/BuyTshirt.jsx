import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import emailjs from '@emailjs/browser';
import Footer from '../slides/Footer'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
};

const qrCodes = {
  'cusatian': '/qrcode.png',
  'noncusatian': '/qrcode.png',
  'seds': '/qrcode.png'
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const BuyTshirt = () => {
  const [toast, setToast] = React.useState({
    value: false,
    color: 'green',
    message: 'Order submitted successfully! Check your email for the token.'
  })
  const [price, setPrice] = React.useState(299)
  useEffect(() => {
    if (toast.value){
      setTimeout(() => {
        setToast(prevToast => ({
            ...prevToast,
            value: false
        }));
      }, 5000)
    }
  }, [toast])
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    size: 'Small',
    sizes: ['XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS'],
    independence: false,
    cusatian: 'Are you a CUSATian',
    address: '',
    file: null,
  });
  const [checkbox, setCheckBox] = useState(false);
  const [independenceOffer, setIndependenceOffer] = useState(false);

  // useEffect(() => {
  //   if(formData.cusatian == 'seds'){
  //     setPrice(299)
  //   }else if(formData.cusatian == 'nonseds' && checkbox){
  //     setPrice(359)
  //   }else if(formData.cusatian == 'nonseds'){
  //     setPrice(299)
  //   }else{
  //     setPrice(299)
  //   }
  // }, [formData, checkbox])
  const [isLoading, setIsLoading] = useState(false);
  const [viewSize, setViewSize] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const generateToken = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const sendEmail = (email, name, token) => {
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICEID,
      import.meta.env.VITE_EMAILJS_TEMPLATEID,
      {
        to_email: email,
        reply_to: 'sedscusat@gmail.com',
        to_name: name,
        from_name: 'SEDS',
        token: token
      },
      import.meta.env.VITE_EMAILJS_USERID
    ).then((result) => {
      console.log('Email sent successfully:', result.text);
    }, (error) => {
      console.error('Error sending email:', error.text);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check for duplicate entries
      const q = query(collection(db, "orders"), where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // alert("An order with this email already exists!");
        setToast({
            value: true,
            color: 'red',
            message: 'An order with this email already exists!'
        })
        setIsLoading(false);
        return;
      }

      // Upload file to Firebase Storage
      let fileUrl = '';
      if (formData.file) {
        const storageRef = ref(storage, `payment_screenshots/${formData.email}_${formData.file.name}`);
        await uploadBytes(storageRef, formData.file);
        fileUrl = await getDownloadURL(storageRef);
      }

      // Generate token
      const token = generateToken();

      // Add data to Firestore
      await addDoc(collection(db, "orders"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        size: formData.size,
        cusatian: formData.cusatian,
        paymentScreenshot: fileUrl,
        timestamp: new Date(),
        sizes: independenceOffer ? formData.sizes : [formData.size],
        address: formData.address,
        independence: independenceOffer,
        price: independenceOffer ? 1947 : price,
        token: token,
      });

      // Send email
      sendEmail(formData.email, formData.name, token);

    //   alert("Order submitted successfully! Check your email for the token.");
      setToast({
        value: true,
        color: 'green',
        message: 'Order submitted successfully! Check your email for the token.'
      })

      setFormData({
        name: '',
        email: '',
        phone: '',
        size: 'Small',
        sizes: ['XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS'],
        cusatian: 'Are you a CUSATian',
        file: null,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    //   alert("An error occurred. Please try again.");
      setToast({
        value: true,
        color: 'red',
        message: 'An error occurred. Please try again.'
      })
    } finally {
      setIsLoading(false);
    }
  };

  const handleIndependenceOffer = () => {
    if(independenceOffer){
      setIndependenceOffer(false);
      setFormData(prevState => ({
        ...prevState,
        independence: false,
        sizes: ['Small', 'Small', 'Small', 'Small', 'Small', 'Small', 'Small', 'Small']
      }));
      setToast({
        value: true,
        color: 'green',
        message: 'Independence Day Offer removed. Please select a size for the T-shirt.'
      })
      setPrice(299);
      return
    }
    setIndependenceOffer(true);
    setFormData(prevState => ({
      ...prevState,
      independence: true,

    }));
    setToast({
      value: true,
      color: 'green',
      message: '* Independence Day Offer applied: 8 T-Shirts for ₹1947. Please select sizes for all 8 T-shirts.'
    })
    setPrice(1947);
  };

  const handleSizeChange = (index, size) => {
    setFormData(prevState => {
      const newSizes = [...prevState.sizes];
      newSizes[index] = size;
      return { ...prevState, sizes: newSizes };
    });
  };

  
  const handleGPayRedirect = () => {
    if(window.innerWidth >= 768){
      setToast({
        value: true,
        color: 'red',
        message: 'Sorry! This feature is only available on mobile devices. Please scan the QR code'
      })
    }
    const receiverUPI = 'pjayasurya@fbl';
    const note = 'Payment for Tshirt';
    const name = 'SEDS';

    const upiUrl = `upi://pay?pa=${receiverUPI}&pn=${encodeURIComponent(name)}&am=${price}&cu=INR&tn=${encodeURIComponent(note)}`;

    console.log(upiUrl);

    window.location.href = upiUrl;
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckBox(checked)
  };

  const upiid = 'sedscusat@oksbi'

  const handleCopy = () => {
    navigator.clipboard.writeText(upiid).then(() => {
      console.log('Email copied to clipboard!');
      setToast({
        value: true,
        color: 'green',
        message: 'UPI ID copied to clipboard!'
      })
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <>

      <div className={`fixed z-[101] top-10 transition ease-in duration-300 left-1/2 -translate-x-1/2 ${toast.value ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`bg-green-500 px-10 py-5 rounded`}>
          <p className='text-white exo text-center'>{toast.message}</p>
        </div>
      </div>
      <div className='h-full pt-10 pb-20 w-screen max-w-screen bg-[#050B17] px-4 sm:px-6 md:px-8 lg:px-10'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-full'>
              {/* <h1 className='exo text-white text-5xl md:text-7xl mb-8'>Buy Tshirt</h1> */}
              <img 
                src="/logo.png" 
                className="w-80 mb-8" 
                alt="logo" 
              />
              <form onSubmit={handleSubmit} className='w-full'>
                <div className='flex flex-col w-full bg-black bg-opacity-30 px-4 sm:px-6 md:px-8 pt-5 py-10 rounded-lg'>
                  <img src="/tshirt.png" className='mb-10 w-full max-w-[40rem] h-auto m-auto' alt="tshirt1" />
                  <div className='space-y-4'>
                    <p className='text-green-400 text-sm'>* Please note: T-shirts may not be available on the event day and could be delivered to your address instead. </p>
                    <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <input type="tel" name="phone" placeholder='Phone' value={formData.phone} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    {independenceOffer ? (
                      <div className="space-y-2">
                        <p className="text-white exo">Select sizes for 8 T-shirts:</p>
                        {formData.sizes.map((size, index) => (
                          <div key={index} className="flex items-center">
                            <span className="text-white exo mr-2">T-shirt {index + 1}:</span>
                            <select
                              value={size}
                              onChange={(e) => handleSizeChange(index, e.target.value)}
                              className="exo text-white bg-[#050B17] p-2 rounded-lg flex-grow"
                            >
                              <option value="XS">XS</option>
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                              <option value="XXL">XXL</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='flex justify-between'>
                        <select name="size" value={formData.size} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-[80%]' required>
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
                          onClick={() => setViewSize(prevState => !prevState)} 
                          className='exo text-white bg-blue-500 p-2 rounded-lg'
                        >
                          {viewSize ? 'Hide Size Chart' : 'View Size Chart'}
                        </button>
                      </div>
                    )}
                    {viewSize && 
                      <img src="/sizechart.jpg" className='w-full max-w-[20rem] h-auto m-auto mt-4' alt="sizechart" />
                    }
                    <select name="cusatian" value={formData.cusatian} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required>
                      <option>Are you a ...?</option>
                      <option value="seds">SEDS Member</option>
                      <option value="nonseds">Non SEDS Member</option>
                    </select>
                    {/* {formData.cusatian == 'nonseds' &&
                    <div className='flex items-center'>
                      <input onChange={handleCheckboxChange} type="checkbox" name="delivery" value="delivery" className='exo text-white bg-[#050B17] p-2 rounded-lg mr-5 p-5' />
                      <label htmlFor="" className='text-white exo '>Home delivery required</label>
                    </div>
                    } */}
                    
                    <textarea name="address" onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' placeholder='Please enter your address' required>
                    </textarea>
                  </div>
                  <div className="mt-6">
                    <button 
                      type="button"
                      onClick={handleIndependenceOffer}
                      className={`w-full py-3 px-4 font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 border-2 ${
                        independenceOffer 
                          ? 'bg-[#138808] hover:bg-[#0F6606] border-[#FF9933] text-white' 
                          : 'bg-[#FF9933] hover:bg-[#FF8C00] border-[#138808] text-white'
                      }`}
                    >
                      {independenceOffer ? (
                        <>
                          <span className="block text-lg">Independence Day Offer Applied!</span>
                          <span className="block text-sm mt-1">Click to remove offer</span>
                        </>
                      ) : (
                        <>
                          <span className="block text-lg">Independence Day Special!</span>
                          <span className="block text-sm mt-1">8 T-Shirts for ₹1947</span>
                          {/* <span className="block text-xs mt-1">(₹278 per person)</span> */}
                        </>
                      )}
                    </button>
                  </div>
                  <button 
                    onClick={handleGPayRedirect} 
                    type="button" 
                    className='exo text-white bg-red-500 p-2 rounded-lg mt-6'
                  >
                    Pay ₹ {price != 359 ? price : independenceOffer ? 1947 : "299    +    ₹ 60 (delivery charge)"}
                  </button>
                  <span className='exo text-white text-center mt-4'>OR</span>
                  <span className='exo text-white text-center mt-4'>Scan the QR code below and pay ₹ {price != 359 ? price : independenceOffer ? 1947 : "299    +    ₹ 60 (delivery charge)"} to{' '}
                  <span
                    onClick={handleCopy}
                    style={{ cursor: 'pointer' }}
                    className='bg-[#050B17] p-1 rounded-lg text-blue-500'
                    title="Click to copy"
                  >
                    {upiid}
                    <i class="fa-solid fa-copy ml-3"></i>
                  </span></span>
                  <img src={qrCodes[formData.cusatian] || '/qrcode.png'} className='w-full max-w-[20rem] h-auto m-auto mt-4 cursor-pointer' alt="gpay" />
                  <label className='exo text-white mt-6'>Upload screenshot of payment</label>
                  <input 
                    type="file" 
                    name="file" 
                    onChange={handleInputChange} 
                    className='exo text-white bg-[#050B17] p-2 rounded-lg mt-2 w-full' 
                    required
                  />
                  <button 
                    type="submit" 
                    className='exo text-white bg-[#1E3A8A] p-2 rounded-lg mt-6 flex justify-center items-center w-full'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {isLoading ? 'Processing...' : 'Submit Order'}
                  </button>   
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuyTshirt;