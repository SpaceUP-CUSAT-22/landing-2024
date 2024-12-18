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
    <div className="flex min-h-screen justify-center bg-black font-sans text-white">
      <div className="flex w-full max-w-7xl flex-col gap-5 p-5 pl-5 md:pl-28 lg:flex-row lg:pl-0">
        {/* Left Section */}
        <div className="flex flex-col lg:w-1/2">
          <div className="mb-5 flex flex-col items-center">
            <p className="font-alternox-regular mb-5">
            Purchasing a ticket to SpaceUP offers numerous benefits for space enthusiasts and curious minds alike. Attendees gain access to expert-led talks that provide valuable insights into current trends and advancements in space exploration. The hands-on workshops allow participants to engage directly with space concepts, enhancing their understanding and skills. Additionally, project exhibitions showcase innovative ideas and foster collaboration among attendees. Networking opportunities abound, enabling participants to connect with like-minded individuals and industry professionals. Overall, a ticket to SpaceUP is an investment in knowledge, inspiration, and community.
            </p>
            <button onClick={() => window.location.replace('/buyticket')} className="font-alternox-bold max-w-[200px] rounded bg-[#9B3CCA] px-6 py-4 text-white transition duration-300 hover:bg-opacity-80">
              Get Ticket
            </button>
          </div>

          {/* Connect Us Card */}
          <div className="relative mb-5 rounded-lg bg-[#1C1C1C] p-5">
            <h3 className="font-alternox-bold mb-3 text-2xl font-bold">
              CONNECT US
            </h3>
            <hr className="my-5" />
            <div className="mb-3">
              <p className="font-alternox-regular text-[#9B3CCA]">Adithya kurup</p>
              <p className="font-alternox-regular">+91 95536 85246</p>
            </div>
            <div className="mb-3">
              <p className="font-alternox-regular text-[#9B3CCA]">Jithin</p>
              <p className="font-alternox-regular">+91 96334 52202</p>
            </div>

            {/* Social Media Icons */}
            <div className="mt-4 flex justify-end">
              <a
                href="https://www.linkedin.com/company/sedscusat/posts/?feedView=all"
                className="ml-5 text-4xl hover:text-[#9B3CCA]"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://www.instagram.com/spaceupcusat/"
                className="ml-5 text-4xl hover:text-[#9B3CCA]"
              >
                <i className="fab fa-instagram"></i>
              </a>
              {/* <a
                href="https://twitter.com"
                className="ml-5 text-4xl hover:text-[#9B3CCA]"
              >
                <i className="fab fa-twitter"></i>
              </a> */}
            </div>
          </div>

          <footer className="mt-auto text-center text-gray-500 font-semibold">
            <p>copyright &copy; 2024 | spaceupcusat</p>
          </footer>
        </div>

        {/* Right Section (Scrolling Image Columns) */}
        <div className="flex items-start justify-center lg:w-1/2">
          <div className="flex h-auto w-full flex-col gap-3 overflow-hidden lg:h-[80vh] lg:flex-row">
            {/* Top Row (Scrolling Left) for smaller screens */}
            <div className="flex-1 overflow-hidden">
              <div className="animate-scroll-1 flex lg:flex-col">
                {[...leftColumnImages, ...leftColumnImages].map(
                  (path, index) => (
                    <img
                      key={`left-${index}`}
                      src={path}
                      alt={`Previous Event Image ${(index % 4) + 1}`}
                      className={`mb-3 mr-3 h-28 w-auto object-cover lg:h-auto lg:w-full`}
                    />
                  ),
                )}
              </div>
            </div>

            {/* Bottom Row (Scrolling Right) for smaller screens */}
            <div className="flex-1 overflow-hidden">
              <div className="animate-scroll-2 flex lg:flex-col">
                {[...rightColumnImages, ...rightColumnImages].map(
                  (path, index) => (
                    <img
                      key={`right-${index}`}
                      src={path}
                      alt={`Previous Event Image ${(index % 4) + 5}`}
                      className="mb-3 mr-3 h-28 w-auto object-cover lg:h-auto lg:w-full"
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind CSS animations */}
      <style jsx>{`
        @keyframes scrollDown {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes scrollUp {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-1 {
          animation: scrollLeft 30s linear infinite;
        }
        .animate-scroll-2 {
          animation: scrollRight 30s linear infinite;
        }

        .animate-scroll-down {
          animation: scrollDown 30s linear infinite;
        }
        .animate-scroll-up {
          animation: scrollUp 30s linear infinite;
        }

        @media (min-width: 1024px) {
          .animate-scroll-1 {
            animation: scrollDown 30s linear infinite;
          }
          .animate-scroll-2 {
            animation: scrollUp 30s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default PrevImages;
