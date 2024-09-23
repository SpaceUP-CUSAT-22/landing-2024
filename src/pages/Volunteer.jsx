import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Footer from '../slides/Footer';

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

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    yearOfStudy: '',
    preferredTeam: '',
    reason: '',
    files: [], // Changed from 'file' to 'files' array
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    value: false,
    color: 'green',
    message: 'Application submitted successfully!'
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'files' ? Array.from(files) : value, // Handle multiple files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let fileUrls = [];
      if (formData.files.length > 0 && formData.preferredTeam === 'production') {
        for (let file of formData.files) {
          const storageRef = ref(storage, `volunteer_applications/${formData.email}_${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          fileUrls.push(url);
        }
      }

      await addDoc(collection(db, "volunteer_applications"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        yearOfStudy: formData.yearOfStudy,
        preferredTeam: formData.preferredTeam,
        reason: formData.reason,
        fileUrls: fileUrls, // Store array of file URLs
        timestamp: new Date(),
      });

      setToast({
        value: true,
        color: 'green',
        message: 'Application submitted successfully!'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        yearOfStudy: '',
        preferredTeam: '',
        reason: '',
        files: [], // Reset files array
      });
    } catch (error) {
      console.error("Error submitting application: ", error);
      setToast({
        value: true,
        color: 'red',
        message: 'An error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed z-[101] top-10 transition ease-in duration-300 left-1/2 -translate-x-1/2 ${toast.value ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`bg-${toast.color}-500 px-10 py-5 rounded`}>
          <p className='text-white exo text-center'>{toast.message}</p>
        </div>
      </div>
      <div className='h-full pt-10 pb-20 w-screen max-w-screen bg-[#050B17] px-4 sm:px-6 md:px-8 lg:px-10'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-full'>
              {/* Add a note about CUSAT students only */}
              <div className='mb-6 text-white exo text-center'>
                <h2 className='text-2xl font-bold'>Volunteer Application</h2>
                <p className='text-lg text-yellow-400'>Note: This application is for CUSAT students only.</p>
              </div>
              
              <form onSubmit={handleSubmit} className='w-full'>
                <div className='flex flex-col w-full bg-black bg-opacity-30 px-4 sm:px-6 md:px-8 pt-5 py-10 rounded-lg'>
                  <div className='space-y-4'>
                    <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <input type="tel" name="phone" placeholder='Phone' value={formData.phone} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <input type="text" name="department" placeholder='Department' value={formData.department} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <input type="text" name="yearOfStudy" placeholder='Year of Study' value={formData.yearOfStudy} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required/>
                    <select name="preferredTeam" value={formData.preferredTeam} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required>
                      <option value="">Preferred Team</option>
                      <option value="events">Events</option>
                      <option value="outreach">Outreach</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="human resources">Human Resources</option>
                      <option value="ambience">Ambience</option>
                      <option value="food committee">Food Committee</option>
                      <option value="operations">Operations</option>
                      <option value="production">Production</option>
                      <option value="curation">Curation</option>
                      <option value="tech">Tech Team</option>
                    </select>
                    <textarea name="reason" placeholder="Why do you think you are fit for the preferred team?" value={formData.reason} onChange={handleInputChange} className='exo text-white bg-[#050B17] p-2 rounded-lg w-full' required></textarea>
                    {formData.preferredTeam === 'production' && (
                      <div>
                        <label className='exo text-white'>Upload Files to show your work</label>
                        <input 
                          type="file" 
                          name="files" 
                          onChange={handleInputChange} 
                          className='exo text-white bg-[#050B17] p-2 rounded-lg mt-2 w-full' 
                          multiple // Allow multiple file selection
                        />
                      </div>
                    )}
                    {formData.files.length > 0 && (
                      <div className='exo text-white'>
                        <p>Selected files:</p>
                        <ul>
                          {formData.files.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
                    {isLoading ? 'Submitting...' : 'Submit Application'}
                  </button>   
                </div>
              </form>
              
              {/* Add contact information here */}
              <div className='mt-8 text-white exo text-center'>
                <h3 className='text-xl mb-2'>For more enquiries, please contact:</h3>
                <p>Athul: <a href="tel:+918078026362" className='text-blue-400'>+91 8078026362</a></p>
                <p>Nandana Dev: <a href="tel:+917012736631" className='text-blue-400'>+91 7012736631</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Volunteer;