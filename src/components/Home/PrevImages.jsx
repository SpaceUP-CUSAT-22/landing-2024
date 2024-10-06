import React from "react";

const PrevImages = () => {
  // Array of image paths
  const imagePaths = [
    "/previmages/img1.png",
    "/previmages/img2.png",
    "/previmages/img3.png",
    "/previmages/img4.png",
    "/previmages/img5.png",
    "/previmages/img6.png",
    "/previmages/img7.png",
    "/previmages/img8.png",
  ];

  const leftColumnImages = imagePaths.slice(0, 4);
  const rightColumnImages = imagePaths.slice(4);

  return (
    <div className="bg-black text-white font-sans min-h-screen flex justify-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-5 p-5">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col">
        <div className="mb-5 flex flex-col items-center">
          <p className="mb-5 font-alternox-regular">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release
            of Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </p>
          <button className="font-alternox-bold bg-[#9B3CCA] text-white py-4 px-6 rounded hover:bg-opacity-80 transition duration-300 max-w-[200px]">
            Get Tickets
          </button>
        </div>

          {/* Connect Us Card */}
          <div className="bg-[#1C1C1C] p-5 rounded-lg relative mb-5">
            <h3 className="text-2xl font-bold mb-3 font-alternox-bold">CONNECT US</h3>
            <hr className="my-5" />
            <div className="mb-3">
              <p className="text-[#9B3CCA] font-alternox-regular">Name Here</p>
              <p className="font-alternox-regular">+91 9876 123 456</p>
            </div>
            <div className="mb-3">
              <p className="text-[#9B3CCA] font-alternox-regular">Name Here</p>
              <p className="font-alternox-regular">+91 9876 123 456</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-end mt-4">
              <a href="https://linkedin.com" className="ml-5 text-4xl hover:text-[#9B3CCA]">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://instagram.com" className="ml-5 text-4xl hover:text-[#9B3CCA]">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" className="ml-5 text-4xl hover:text-[#9B3CCA]">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <footer className="mt-auto text-center text-gray-500">
            <p>copyright &copy; 2024 | spaceupcusat</p>
          </footer>
        </div>

        {/* Right Section (Scrolling Image Columns) */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <div className="flex w-full h-[80vh] overflow-hidden gap-3">
            {/* Left Column (Scrolling Down) */}
            <div className="flex-1 overflow-hidden">
              <div className="animate-scroll-down flex flex-col">
                {[...leftColumnImages, ...leftColumnImages].map((path, index) => (
                  <img
                    key={`left-${index}`}
                    src={path}
                    alt={`Previous Event Image ${index % 4 + 1}`}
                    className="w-full h-auto object-cover mb-3"
                  />
                ))}
              </div>
            </div>

            {/* Right Column (Scrolling Up) */}
            <div className="flex-1 overflow-hidden ml-3">
              <div className="animate-scroll-up flex flex-col">
                {[...rightColumnImages, ...rightColumnImages].map((path, index) => (
                  <img
                    key={`right-${index}`}
                    src={path}
                    alt={`Previous Event Image ${index % 4 + 5}`}
                    className="w-full h-auto object-cover mb-3"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind CSS animations */}
      <style jsx>{`
        @keyframes scrollDown {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollUp {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-down {
          animation: scrollDown 30s linear infinite;
        }
        .animate-scroll-up {
          animation: scrollUp 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PrevImages;
