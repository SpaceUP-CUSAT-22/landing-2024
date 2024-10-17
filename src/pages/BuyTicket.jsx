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

  useEffect(() => {
    // Apply discount if referral code is valid
    if (isValidReferral) {
      setPrice(399 * 0.9); // 10% discount
    } else {
      setPrice(399); // Regular price
    }
  }, [isValidReferral]);

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
    const receiverUPI = "pjayasurya@fbl";
    const note = "Payment for SpaceUp CUSAT Ticket";
    const name = "SEDS";

    const upiUrl = `upi://pay?pa=${receiverUPI}&pn=${encodeURIComponent(name)}&am=${price}&cu=INR&tn=${encodeURIComponent(note)}`;

    console.log(upiUrl);
    window.location.href = upiUrl;
  };

  const upiid = "pjayasurya@fbl";

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
      {/* Toast Notification */}
      <div
        className={`fixed bg-orange-500 top-10 left-1/2 transform -translate-x-1/2 z-[101] transition duration-300 ease-in ${
          toast.value ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={`bg-${toast.color}-500 px-10 py-5 rounded`}>
          <p className="exo text-center text-white">{toast.message}</p>
        </div>
      </div>

      <img
        src="/logo.svg"
        alt="Space"
        className="w-[350px] m-3 max-w-md"
      />
      <h1 className="text-xl p-6">Get Your Ticket Here</h1>
      
      
      <div className="flex-grow flex flex-col lg:flex-row justify-between items-start p-6 sm:px-12">
        {/* Form Column */}
        <div className="w-full lg:w-1/3 lg:pr-4 mb-6 lg:mb-0">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="PHONE"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
              required
            />
            <input
              type="text"
              name="college"
              placeholder="COLLEGE/SCHOOL"
              value={formData.college}
              onChange={handleInputChange}
              className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
              required
            />
            <input
              type="text"
              name="year"
              placeholder="YEAR/CLASS"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
              required
            />
            <select
              name="workshop"
              value={formData.workshop}
              onChange={handleInputChange}
              className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
              required
            >
              <option value="">SELECT WORKSHOP</option>
              <option value="Dr. Yedu Krishna">Dr. Yedu Krishna - The role of R&D startups in reliant India</option>
              <option value="AMAL SREE AJITH">AMAL SREE AJITH - Astrophotography</option>
              <option value="TEAM MARUTSAKA">TEAM MARUTSAKA - Skies unlocked, Inside team Marutsakha's journey</option>
              <option value="Quiz">Quiz</option>
            </select>
            {showTeamOptions && (
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => handleTeamAction('create')}
                    className={`flex-1 py-2 rounded ${teamAction === 'create' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-200'}`}
                  >
                    Create Team
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTeamAction('join')}
                    className={`flex-1 py-2 rounded ${teamAction === 'join' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-200'}`}
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
                      className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
                    />
                    <button
                      type="button"
                      onClick={teamAction === 'create' ? handleCreateTeam : handleJoinTeam}
                      className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
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
            <input
              type="text"
              name="referralCode"
              placeholder="COUPON CODE (OPTIONAL)"
              value={referralCode}
              onChange={handleReferralCodeChange}
              className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
            />
            <button
              type="button"
              onClick={verifyReferralCode}
              disabled={isVerifying}
              className="w-2/5 px-2 py-3 bg-transparent border border-purple-500 text-purple-500 rounded text-sm whitespace-nowrap transition-colors duration-200"
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </button>
            {verificationMessage && (
              <p className={`text-sm ${isValidReferral ? "text-green-500" : "text-red-500"}`}>
                {verificationMessage}
              </p>
            )}
            <button
              onClick={handleGPayRedirect}
              type="button"
              className="w-full py-3 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors duration-200"
            >
              Pay ₹ {price.toFixed(2)}
            </button>
            <span className="text-center text-white">OR</span>
            <span className="text-center text-white">
              Scan the QR code below and pay ₹ {price.toFixed(2)} to{" "}
              <span
                onClick={handleCopy}
                style={{ cursor: "pointer" }}
                className="bg-[#050B17] p-1 text-blue-500 rounded"
                title="Click to copy"
              >
                {upiid}
                <i className="fa-solid fa-copy ml-3"></i>
              </span>
            </span>
            
            <input
              type="file"
              name="file"
              onChange={handleInputChange}
              className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors duration-200"
            >
              {isLoading ? "Processing..." : "SUBMIT"}
            </button>
          </form>
        </div>
        
        {/* Scan to Pay Column */}
        <div className="w-full lg:w-1/3 lg:px-4 mb-6 lg:mb-0 flex flex-col items-center">
          <h2 className="text-lg mb-3 font-alternox-regular">SCAN TO PAY</h2>
          <div className="bg-white p-2 rounded-lg">
            {/* Replace with an actual QR code image */}
            <img src="/qrcode.png" alt="qrcode" />
          </div>
        </div>

        {/* SpaceUp and Astronaut Column */}
        <div className="w-full lg:w-1/3 lg:pl-4 flex flex-col items-center justify-center relative h-[60vh] lg:h-auto">
          <h1
            ref={spaceupRef}
            className="hidden font-alternox-regular text-center font-bold tracking-wider text-white z-10 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              textShadow: "0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080",
            }}
          >
            SPACEUP
          </h1>
          <img
            ref={astronautRef}
            src="/Astronaut1.png"
            alt="Space"
            className="hidden w-3/4 max-w-md z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          
          <h2
            ref={cusatRef}
            className="hidden font-alternox-regular text-center text-2xl font-semibold tracking-widest text-white z-30 absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          >
            C U S A T
          </h2>
        </div>
      </div>
      
      <footer className="mt-auto p-4 text-center text-xs border-t border-gray-700 font-alternox-regular">
        copyright © 2024 | spaceupCUSAT
      </footer>
    </div>
  );
};

export default BuyTicket;



      
