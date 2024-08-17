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

const BulkRegister = () => {
  const [toast, setToast] = React.useState({
    value: false,
    color: 'green',
    message: 'Order submitted successfully! Check your email for the token.'
  })
  const [price, setPrice] = React.useState(349)
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
    address: '',
    tshirt: '',
    session: '',
    institution: '',
    cusatian: '',
    class: '',
    food: ''
  });
  const [checkbox, setCheckBox] = useState(false);

  useEffect(() => {
    if(formData.tshirt != 'yes'){
      setPrice(349)
    }else if(formData.tshirt == 'yes'){
      setPrice(648)
    }
  }, [formData, checkbox])

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
      import.meta.env.VITE_EMAILJS_TEMPLATEID2,
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
      const q = query(collection(db, "bulkregistrations"), where("email", "==", formData.email));
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

      const sessionQuery = query(collection(db, "bulkregistrations"), where("session", "==", formData.session));
      const sessionQuerySnapshot = await getDocs(sessionQuery);

      if(formData.session == "jithin" && sessionQuerySnapshot.size >= 150){
        setToast({
          value: true,
          color: 'red',
          message: 'This session is already full. Please choose another session.'
        });
        setIsLoading(false);
        return;
      }else if(formData.session == "ajison"  && sessionQuerySnapshot.size >= 90){
        setToast({
          value: true,
          color: 'red',
          message: 'This session is already full. Please choose another session.'
        });
        setIsLoading(false);
        return;
      }else if(formData.session == "varun"  && sessionQuerySnapshot.size >= 50){
        setToast({
          value: true,
          color: 'red',
          message: 'This session is already full. Please choose another session.'
        });
        setIsLoading(false);
        return;
      }

      // Generate token
      const token = generateToken();

      // Add data to Firestore
      await addDoc(collection(db, "registrations"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        size: formData.size,
        tshirt: formData.tshirt,
        timestamp: new Date(),
        address: formData.address,
        session: formData.session,
        cusatian: formData.cusatian,
        institution: formData.institution,
        class: formData.class,
        food: formData.food,
        price: price,
        token: token,
        arrived: true
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
        tshirt: '',
        address: '',
        session: '',
        institution: '',
        food: '',
        class: '',
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

    const upiid = 'pjayasurya@fbl'

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

    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setCheckBox(checked)
    };

  return (
    <>

      <div className={`fixed z-[101] top-10 transition ease-in duration-300 left-1/2 -translate-x-1/2 ${toast.value ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`bg-[#1E3A8A] px-10 py-5 rounded`}>
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
                  {/* <img src="/tshirt.png" className='mb-10 w-full max-w-[40rem] h-auto m-auto' alt="tshirt1" /> */}
                  <div className='space-y-4'>
                    <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <input type="tel" name="phone" placeholder='Phone' value={formData.phone} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <input type="text" name="institution" placeholder='Institution' value={formData.institution} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' />
                    <input type="text" name="class" placeholder='Class or Year of study' value={formData.class} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' />
                    <select name="session" value={formData.session} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required>
                      <option value="" selected>Which among the parallel session do you want to register?</option>
                      <option value="jithin">AI-Powered Space Exploration: Uncovering the Secrets of Life in the Universe - by Mr. Jithin Raj</option>
                      <option value="varun">Unveiling Earth: Insights from Space - by Mr. Varun K</option>
                      {/* <option value="surendran">On the Celestial Shores of the Milky Way - by Mr. Surendran Punnaherry</option> */}
                      {/* <option value="paulose">Alien Hoaxes: Fact, Fiction, and the Fine Line Between - by Mr. Paulose Thomas</option> */}
                      {/* <option value="suresh">Journey to zero Gravity and Edge of Space - by Dr. T N Suresh Kumar</option> */}
                      <option value="ajison">Exploring the Final Frontier : Reaching Out to Outer Space with UAV's aka Drone (workshop) - by Mr. Ajison George</option>
                    </select>
                    <select name="food" value={formData.food} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required>
                      <option value="" selected>Your food preference</option>
                      <option value="non-veg">Non-veg</option>
                      <option value="veg">Veg</option>
                    </select>
                    <select name="cusatian" value={formData.cusatian} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required>
                      <option value="" selected>Are you a ...?</option>
                      <option value="seds">SEDS Member</option>
                      <option value="nonseds">Non SEDS Member</option>
                    </select>
                    <select name="tshirt" value={formData.tshirt} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required>
                      <option value="" selected>Do you want a T-shirt?</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {formData.tshirt == 'yes' && <div className='flex justify-between'>
                      <select name="size" value={formData.size} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-[80%]' required>
                        <option value="" selected>Size</option>
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
                    </div>}
                    {viewSize && 
                      <img src="/sizechart.jpg" className='w-full max-w-[20rem] h-auto m-auto mt-4' alt="sizechart" />
                    }
                    {/* {formData.cusatian == 'nonseds' && formData.tshirt == 'yes' &&
                    <div className='flex items-center'>
                      <input onChange={handleCheckboxChange} type="checkbox" name="delivery" value="delivery" className='exo text-white bg-[#050B17] p-2 rounded-lg mr-5 p-5' />
                      <label htmlFor="" className='text-white exo '>Home delivery required</label>
                    </div>
                    } */}
                    
                    <textarea name="address" onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' placeholder='Please enter your address' >
                    </textarea>
                  </div>
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

export default BulkRegister;