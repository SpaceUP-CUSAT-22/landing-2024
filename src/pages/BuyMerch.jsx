import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import emailjs from '@emailjs/browser';

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

const BuyMerch = () => {
  const [referralCode, setReferralCode] = useState('');
  const [isValidReferral, setIsValidReferral] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

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
    cusatian: 'Are you a CUSATian',
    address: '',
    file: null,
  });
  const [checkbox, setCheckBox] = useState(false);

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
  useEffect(() => {
    let newPrice = 299; // Base price
    if (formData.cusatian === 'nonseds' && checkbox) {
      newPrice = 359;
    }
    if (isValidReferral) {
      newPrice -= 50;
    }
    setPrice(newPrice);
  }, [formData.cusatian, checkbox, isValidReferral]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewSize, setViewSize] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleReferralCodeChange = (e) => {
    const code = e.target.value.trim();
    setReferralCode(code);
    setIsValidReferral(false);
    setVerificationMessage('');
  };

  const verifyReferralCode = async () => {
    if (!referralCode) {
        setVerificationMessage('Please enter a referral code.');
        return;
    }
    setIsVerifying(true);
    setVerificationMessage('');
    try {
        const response = await fetch('https://ca.spaceupcusat.com/api/users/referrals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ referralCode }),
        });
        const data = await response.json();
        setIsValidReferral(data.isValid);
        setVerificationMessage(data.message);
    } catch (error) {
        console.error('Error verifying referral code:', error);
        setVerificationMessage('Error verifying code. Please try again.');
    } finally {
        setIsVerifying(false);
    }
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
        address: formData.address,
        referralCode: isValidReferral ? referralCode : null,
        price,
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
    <div className="min-h-screen bg-black flex flex-col justify-center items-center overflow-hidden relative py-20">
      {/* Toast Notification */}
      <div className={`fixed z-[101] top-10 transition ease-in duration-300 left-1/2 -translate-x-1/2 ${toast.value ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`bg-${toast.color}-500 px-10 py-5 rounded`}>
          <p className='text-white exo text-center'>{toast.message}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10'>
        <img 
          src="/logo.png" 
          className="w-80 mb-8 mx-auto" 
          alt="logo" 
        />
        
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl text-white text-center font-bold mb-8 tracking-wider font-alternox-regular"
          style={{ 
            textShadow: '0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080',
            transform: 'scaleX(1.2)' 
          }}
        >
          BUY MERCH
        </h1>

        <form onSubmit={handleSubmit} className='w-full'>
          <div className='flex flex-col w-full bg-black bg-opacity-50 px-4 sm:px-6 md:px-8 pt-5 py-10 rounded-lg'>
            <img src="/tshirt.png" className='mb-10 w-full max-w-[40rem] h-auto m-auto' alt="tshirt1" />
            
                  <div className='space-y-4'>
                    <p className='text-green-400 text-sm'>* Please note: T-shirts may not be available on the event day and could be delivered to your address instead. </p>
                    <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <input type="tel" name="phone" placeholder='Phone' value={formData.phone} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    
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
                    <input 
                      type="text" 
                      name="referralCode" 
                      placeholder='Referral Code (optional)' 
                      value={referralCode} 
                      onChange={handleReferralCodeChange} 
                      className='exo text-white bg-[#050B17] p-2 rounded-lg flex-grow'
                    />
                    <button 
                      type="button"
                      onClick={verifyReferralCode}
                      disabled={isVerifying}
                      className='exo text-white bg-blue-500 p-2 rounded-lg whitespace-nowrap'
                    >
                      {isVerifying ? 'Verifying...' : 'Verify Code'}
                    </button>
                  </div>
                  {verificationMessage && (
                    <p className={`text-sm mt-2 ${isValidReferral ? 'text-green-500' : 'text-red-500'}`}>
                      {verificationMessage}
                    </p>
                  )}
                  <button 
                    onClick={handleGPayRedirect} 
                    type="button" 
                    className='exo text-white bg-red-500 p-2 rounded-lg mt-6'
                  >
                    Pay ₹ {price != 359 ? price : "299    +    ₹ 60 (delivery charge)"}
                  </button>
                  <span className='exo text-white text-center mt-4'>OR</span>
                  <span className='exo text-white text-center mt-4'>Scan the QR code below and pay ₹ {price != 359 ? price : "299    +    ₹ 60 (delivery charge)"} to{' '}
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
              className='exo text-white bg-purple-700 p-3 rounded-lg mt-6 flex justify-center items-center w-full text-xl font-bold transition-all duration-300 hover:bg-purple-600'
              disabled={isLoading}
              style={{
                textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #800080',
                boxShadow: '0 0 15px #800080'
              }}
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

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
    </div>
  );
};

export default BuyMerch;