import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const BuyTicket = () => {
  const spaceupRef = useRef(null);
  const cusatRef = useRef(null);
  const astronautRef = useRef(null);
  const [price, setPrice] = useState(399); // Initial ticket price


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    workshop: "",
    file: null,
    food: ""
  });

  const [workshopLimits, setWorkshopLimits] = useState({
    "Dr. Yedu Krishna": 400,
    "TEAM MARUTSAKA": 50,
    "AMAL SREE AJITH": 120,
    "Quiz": 16
  });

  const [referralCode, setReferralCode] = useState("");
  const [isValidReferral, setIsValidReferral] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    value: false,
    color: "green",
    message: "Ticket booked successfully! Check your email for the token.",
  });
  const [showTeamOptions, setShowTeamOptions] = useState(false);
  const [teamAction, setTeamAction] = useState(''); // 'create' or 'join'
  const [teamName, setTeamName] = useState('');
  const [teamMessage, setTeamMessage] = useState('');


  useEffect(() => {
    const spaceupText = spaceupRef.current;
    const cusatText = cusatRef.current;
    const astronaut = astronautRef.current;

    // Initial setup
    gsap.set(spaceupText, { fontSize: "clamp(3rem, 8vw, 6rem)" });
    gsap.set(cusatText, { opacity: 0, y: 20 });
    gsap.set(astronaut, { y: "-100%", opacity: 0 });

    // Animation
    const tl = gsap.timeline();

    tl.to(spaceupText, {
      fontSize: "clamp(2.5rem, 7vw, 5rem)",
      duration: 1,
      ease: "power2.inOut"
    })
    .to(astronaut, {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      onComplete: startFloatingAnimation
    }, "<")
    .to(cusatText, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "<+=0.5");

    function startFloatingAnimation() {
      gsap.to(astronaut, {
        y: "+=20",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

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

  const checkWorkshopAvailability = async (workshop) => {
    const workshopRef = doc(db, 'workshopCounts', workshop);
    const workshopDoc = await getDoc(workshopRef);
    
    if (workshopDoc.exists()) {
      const currentCount = workshopDoc.data().count;
      return currentCount < workshopLimits[workshop];
    }
    return true; // If document doesn't exist, assume it's available
  };

  const updateWorkshopCount = async (workshop) => {
    const workshopRef = doc(db, 'workshopCounts', workshop);
    const workshopDoc = await getDoc(workshopRef);
    
    if (workshopDoc.exists()) {
      await updateDoc(workshopRef, {
        count: workshopDoc.data().count + 1
      });
    } else {
      await setDoc(workshopRef, { count: 1 });
    }
  };


  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));

    if (name === 'workshop') {
      setShowTeamOptions(value === 'Quiz');
      setTeamAction('');
      setTeamName('');
      setTeamMessage('');
    }
  };

  const handleReferralCodeChange = (e) => {
    const code = e.target.value.trim();
    setReferralCode(code);
    setIsValidReferral(false);
    setVerificationMessage("");
  };

  const verifyReferralCode = async () => {
    if (!referralCode) {
      setVerificationMessage("Please enter a referral code.");
      return;
    }
    setIsVerifying(true);
    setVerificationMessage("");
    try {
      const response = await fetch(
        "https://ca.spaceupcusat.com/api/users/referrals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ referralCode }),
        },
      );
      const data = await response.json();
      setIsValidReferral(data.isValid);
      setVerificationMessage(data.message);
    } catch (error) {
      console.error("Error verifying referral code:", error);
      setVerificationMessage("Error verifying code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const generateToken = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleGPayRedirect = () => {
    if (window.innerWidth >= 768) {
      setToast({
        value: true,
        color: "red",
        message: "Sorry! This feature is only available on mobile devices. Please scan the QR code",
      });
      return;
    }
    const receiverUPI = "sheenakm10-2@oksbi";
    const note = "Payment for SpaceUp CUSAT Ticket";
    const name = "SEDS";

    const upiUrl = `upi://pay?pa=${receiverUPI}&pn=${encodeURIComponent(name)}&am=${price}&cu=INR&tn=${encodeURIComponent(note)}`;

    console.log(upiUrl);
    window.location.href = upiUrl;
  };

  const upiid = "sheenakm10-2@oksbi";

  const handleCopy = () => {
    navigator.clipboard.writeText(upiid).then(
      () => {
        console.log("UPI ID copied to clipboard!");
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

  const handleTeamAction = (action) => {
    setTeamAction(action);
    setTeamName('');
    setTeamMessage('');
  };

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      setTeamMessage('Please enter a team name.');
      return;
    }

    try {
      const teamRef = doc(db, 'quizTeams', teamName);
      const teamDoc = await getDoc(teamRef);

      if (teamDoc.exists()) {
        setTeamMessage('This team name already exists. Please choose another.');
        return;
      }

      await setDoc(teamRef, {
        leader: formData.name,
        members: [],
      });

      setTeamMessage(`Team "${teamName}" created successfully. Share this team name with your team members.`);
    } catch (error) {
      console.error('Error creating team:', error);
      setTeamMessage('An error occurred while creating the team. Please try again.');
    }
  };

  const handleJoinTeam = async () => {
    if (!teamName.trim()) {
      setTeamMessage('Please enter a team name.');
      return;
    }

    try {
      const teamRef = doc(db, 'quizTeams', teamName);
      const teamDoc = await getDoc(teamRef);

      if (!teamDoc.exists()) {
        setTeamMessage('This team does not exist. Please check the team name and try again.');
        return;
      }

      const teamData = teamDoc.data();
      if (teamData.members.includes(formData.name) || teamData.leader === formData.name) {
        setTeamMessage('You are already a member of this team.');
        return;
      }

      await updateDoc(teamRef, {
        members: [...teamData.members, formData.name],
      });

      setTeamMessage(`You've successfully joined the team "${teamName}".`);
    } catch (error) {
      console.error('Error joining team:', error);
      setTeamMessage('An error occurred while joining the team. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const isWorkshopAvailable = await checkWorkshopAvailability(formData.workshop);
      // if (!isWorkshopAvailable) {
        //   setToast({
          //     value: true,
          //     color: "red",
          //     message: "Sorry, this workshop is full. Please choose another.",
          //   });
          //   setIsLoading(false);
          //   return;
          // }
          
          
      // Check for duplicate entries
      const q = query(
        collection(db, "ticketorders"),
        where("email", "==", formData.email),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setToast({
          value: true,
          color: "red",
          message: "A ticket with this email already exists!",
        });
        setIsLoading(false);
        return;
      }

      // Upload file to Firebase Storage
      let fileUrl = "";
      if (formData.file) {
        const storageRef = ref(
          storage,
          `ticket_payment_screenshots/${formData.email}_${formData.file.name}`,
        );
        await uploadBytes(storageRef, formData.file);
        fileUrl = await getDownloadURL(storageRef);
      }

      // Generate token
      const token = generateToken();

      // Add data to Firestore
      console.log(formData, fileUrl, new Date(), isValidReferral, referralCode, token)
      const ticketData = {
        ...formData,
        file: null,
        paymentScreenshot: fileUrl,
        timestamp: new Date(),
        referralCode: isValidReferral ? referralCode : null,
        token: token,
        price
      };

      if (formData.workshop === 'Quiz') {
        ticketData.quizTeam = {
          action: teamAction,
          teamName: teamName,
        };
      }

      await addDoc(collection(db, "ticketorders"), ticketData);

      await updateWorkshopCount(formData.workshop);





      // Send email
      // sendEmail(formData.email, formData.name, token);

      setToast({
        value: true,
        color: "green",
        message: "Ticket booked successfully! You will receive an email with your ticket 2 days before the event",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        college: "",
        year: "",
        workshop: "",
        file: null,
      });
      setReferralCode("");
      setIsValidReferral(false);
      setShowTeamOptions(false);
      setTeamAction('');
      setTeamName('');
      setTeamMessage('');

    } catch (error) {
      console.error("Error adding document: ", error);
      setToast({
        value: true,
        color: "red",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-2 px-4">
          <p className="text-center font-bold animate-pulse">
            🚀 FLASH SALE ON NOW! Limited Time Offer 🚀
          </p>
        </div>
        {/* Toast Notification */}
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-[101] transition duration-300 ease-in ${
            toast.value ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={`bg-orange-500 px-6 py-3 rounded-lg shadow-lg`}>
            <p className="text-white text-center font-semibold">{toast.message}</p>
          </div>
        </div>
    
        <Link to="/" className="bg-gray-900 py-4 px-6 flex justify-between items-center">
          <img src="/logo.svg" alt="SpaceUp CUSAT" className="h-12" />
          <h1 className="text-2xl font-bold">Get Your Ticket</h1>
        </Link>

        
    
        <main className="flex-grow flex flex-col lg:flex-row justify-between p-6 lg:p-12 space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Form Column */}
          <div className="w-full lg:w-1/2 xl:w-2/5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
                required
              />
              <input
                type="text"
                name="college"
                placeholder="College/School"
                value={formData.college}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
                required
              />
              <input
                type="text"
                name="year"
                placeholder="Year/Class"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
                required
              />
              <select
                name="workshop"
                value={formData.workshop}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
                required
              >
                <option value="">Select Workshop</option>
                <option value="Dr. Yedu Krishna">Dr. Yedu Krishna - The role of R&D startups in reliant India</option>
                <option value="Dr. Yedu Krishna">(SOLD OUT) AMAL SREE AJITH - Astrophotography</option>
                <option value="Dr. Yedu Krishna">(SOLD OUT) TEAM MARUTSAKA - Skies unlocked, Inside team Marutsakha's journey</option>
                {/* <option value="Quiz">Quiz</option> */}
              </select>
              <select
                name="food"
                value={formData.food}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
                required
              >
                <option value="">Select Preference</option>
                <option value="non-veg">Non-Veg</option>
                <option value="veg">Veg</option>
              </select>
    
              {showTeamOptions && (
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => handleTeamAction('create')}
                      className={`flex-1 py-2 rounded-lg ${teamAction === 'create' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                      Create Team
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTeamAction('join')}
                      className={`flex-1 py-2 rounded-lg ${teamAction === 'join' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                      Join Team
                    </button>
                  </div>
                  {teamAction && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder={teamAction === 'create' ? "Enter new team name" : "Enter team name to join"}
                        value={teamName}
                        onChange={handleTeamNameChange}
                        className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
                      />
                      <button
                        type="button"
                        onClick={teamAction === 'create' ? handleCreateTeam : handleJoinTeam}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        {teamAction === 'create' ? 'Create Team' : 'Join Team'}
                      </button>
                      {teamMessage && (
                        <p className="text-sm text-yellow-400">{teamMessage}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
    
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="referralCode"
                  placeholder="Coupon Code (Optional)"
                  value={referralCode}
                  onChange={handleReferralCodeChange}
                  className="flex-grow py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={verifyReferralCode}
                  disabled={isVerifying}
                  className="px-4 py-3 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors duration-200 whitespace-nowrap"
                >
                  {isVerifying ? "Verifying..." : "Verify Code"}
                </button>
              </div>
              {verificationMessage && (
                <p className={`text-sm ${isValidReferral ? "text-green-500" : "text-red-500"}`}>
                  {verificationMessage}
                </p>
              )}
    
              <div className="space-y-4">
                <button
                  onClick={handleGPayRedirect}
                  type="button"
                  className="w-full py-3 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors duration-200"
                >
                    
                Pay ₹ {price.toFixed(2)}
                </button>
              <p className="text-center text-gray-400">OR</p>
              <p className="text-center text-gray-300">
                Scan the QR code below and pay ₹ {price.toFixed(2)} to{" "}
                <span
                  onClick={handleCopy}
                  className="bg-gray-800 px-2 py-1 text-blue-400 rounded cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                  title="Click to copy"
                >
                  {upiid}
                  <i className="fas fa-copy ml-2"></i>
                </span>
              </p>

              {/* Bank Transfer Note */}
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <p className="text-sm text-yellow-400">
                  ⚠️ If UPI payment is not working, please use bank transfer with the account details provided. 
                  Don't forget to upload the payment screenshot!
                </p>
              </div>
            </div>

            {/* Mobile-only Payment Section */}
            <div className="lg:hidden p-6 space-y-6">

              {/* QR Code Section */}
              <div className="hidden bg-gray-800 p-4 rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-semibold mb-3">Scan to Pay ₹{price}</h2>
                <div className="bg-white p-2 rounded-lg inline-block">
                  <img src="/qrcode.png" alt="QR Code for payment" className="w-full max-w-[200px] mx-auto" />
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  UPI ID: <span
                    onClick={handleCopy}
                    className="bg-gray-700 px-2 py-1 text-blue-400 rounded cursor-pointer"
                    title="Click to copy"
                  >
                    {upiid}
                    <i className="fas fa-copy ml-2"></i>
                  </span>
                </p>
              </div>

              {/* Bank Details */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-3">Bank Transfer Details</h2>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Account no.:</span> 42144526050</p>
                  <p><span className="text-gray-400">IFSC CODE:</span> SBIN0070235</p>
                  <p><span className="text-gray-400">Bank Name:</span> SBI</p>
                  <p><span className="text-gray-400">Branch:</span> CUSAT Branch</p>
                  <p><span className="text-gray-400">SWIFT CODE:</span> SBININBBT30</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="file" className="block text-sm text-gray-400">Upload Payment Screenshot</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleInputChange}
                className="w-full py-2 px-3 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
                // required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors duration-200"
            >
              {isLoading ? "Processing..." : "SUBMIT"}
            </button>
          </form>
        </div>

        <div className="hidden lg:block w-full lg:w-1/2 xl:w-1/3 space-y-8">

          {/* Payment Details */}
          <div className="hidden bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-400">Account no.:</span> 42144526050</p>
              <p><span className="text-gray-400">IFSC CODE:</span> SBIN0070235</p>
              <p><span className="text-gray-400">Bank Name:</span> SBI</p>
              <p><span className="text-gray-400">Branch:</span> CUSAT Branch</p>
              <p><span className="text-gray-400">SWIFT CODE:</span> SBININBBT30</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="hidden bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Scan to Pay</h2>
            <div className="bg-white p-2 rounded-lg inline-block">
              <img src="/qrcode.png" alt="QR Code for payment" className="w-full max-w-[200px] mx-auto" />
            </div>
          </div>
        </div>

        {/* SpaceUp and Astronaut Column - Hidden on mobile, visible on larger screens */}
        <div className="hidden xl:block w-1/4 relative">
          <h1
            ref={spaceupRef}
            className="hidden font-alternox-regular text-center font-bold tracking-wider text-white absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              textShadow: "0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080",
            }}
          >
            SPACEUP
          </h1>
          <img
            ref={astronautRef}
            src="/Astronaut1.png"
            alt="Astronaut"
            className="hidden w-full max-w-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <h2
            ref={cusatRef}
            className="hidden font-alternox-regular text-center text-2xl font-semibold tracking-widest text-white absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          >
            C U S A T
          </h2>
        </div>
      </main>

      {/* Contact Information Section */}
      <div className="w-full text-center py-6 bg-gray-900">
        <h3 className="text-lg font-semibold mb-2">For any queries, contact:</h3>
        <p>Aditya Kurup: 95536 85246</p>
        <p>Jithin: 96334 52202</p>
      </div>

      <footer className="mt-auto p-4 text-center text-xs border-t border-gray-800">
        &copy; 2024 SpaceUp CUSAT. All rights reserved.
      </footer>
    </div>
  );
}

export default BuyTicket