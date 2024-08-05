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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const BuyTshirt = () => {
  const [toast, setToast] = React.useState({
    value: false,
    color: 'green',
    message: 'Order submitted successfully! Check your email for the token.'
  })
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
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);

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
        to_name: name,
        from_name: 'SEDS',
        token: token,
        message: `Random message ${token}`
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
        const receiverUPI = 'abhinavcv007@okaxis';
        const amount = '500.00';
        const note = 'Payment for Tshirt';
        const name = 'SEDS';

        const upiUrl = `upi://pay?pa=${receiverUPI}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

        console.log(upiUrl);

        window.location.href = upiUrl;
    };

  return (
    <>
        <div className={`fixed z-[101] top-10 transition ease-in duration-300 left-1/2 -translate-x-1/2 ${toast.value ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-${toast.color}-500 px-10 py-5 rounded`}>
            <p className='text-white exo text-center'>{toast.message}</p>
            </div>
        </div>
        <div className='min-h-screen min-w-screen bg-[#050B17] overflow-y-hidden'>
        <div className=''>
            <div className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='exo text-white text-5xl md:text-7xl'>Buy Tshirt</h1>
                <form onSubmit={handleSubmit} className='flex flex-col md:flex-row'>
                    <div className='flex flex-col w-full m-5 bg-black bg-opacity-30 px-10 pt-5 py-10'>
                        <img src="/tshirt1.png" className='w-[20rem] h-[20rem] m-auto' alt="tshirt1" />
                        <h1 className='exo text-white text-2xl'>Tshirt 1</h1>
                        <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg my-2' required/>
                        <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg my-2' required/>
                        <input type="tel" name="phone" placeholder='Phone' value={formData.phone} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg my-2' required/>
                        <select name="size" value={formData.size} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg my-2' required>
                            <option>Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="extralarge">Extra Large</option>
                        </select>
                        <select name="cusatian" value={formData.cusatian} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg my-2' required>
                            <option>Are you a CUSATian</option>
                            <option value="cusatian">CUSATian</option>
                            <option value="noncusatian">Non-CUSATian</option>
                        </select>
                        <button 
                        onClick={handleGPayRedirect} 
                        type="button" 
                        className='exo text-white bg-red-500 p-2 rounded-lg'
                        >
                        Pay ₹ 500
                        </button>
                        <label className='exo text-white mt-5'>Upload screenshot of payment</label>
                        <input 
                        type="file" 
                        name="file" 
                        onChange={handleInputChange} 
                        className='exo text-white bg-[#050B17] p-2 rounded-lg my-2' 
                        required
                        />
                        <button 
                        type="submit" 
                        className='exo text-white bg-[#1E3A8A] p-2 rounded-lg mt-4 flex justify-center items-center'
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
    </>
  );
};

export default BuyTshirt;