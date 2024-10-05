const BuyTicket = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col p-6 sm:px-12">
      <h1 className="text-xl mb-6">Get Your Ticket Here</h1>
      
      <div className="flex-grow flex flex-col lg:flex-row justify-between items-start">
        {/* Form Column */}
        <div className="w-full lg:w-1/3 lg:pr-4 mb-6 lg:mb-0">
          <form className="flex flex-col space-y-3">
            <input type="text" placeholder="NAME" className="w-full p-1.5 bg-transparent border border-purple-500 rounded text-sm" />
            <input type="email" placeholder="EMAIL" className="w-full p-1.5 bg-transparent border border-purple-500 rounded text-sm" />
            <input type="tel" placeholder="PHONE" className="w-full p-1.5 bg-transparent border border-purple-500 rounded text-sm" />
            <input type="text" placeholder="COLLEGE/SCHOOL" className="w-full p-1.5 bg-transparent border border-purple-500 rounded text-sm" />
            <input type="text" placeholder="YEAR/CLASS" className="w-full p-1.5 bg-transparent border border-purple-500 rounded text-sm" />
            <input type="text" placeholder="COUPON CODE (OPTIONAL)" className="w-full p-1.5 bg-transparent border border-purple-500 rounded text-sm" />
            <button type="button" className="w-2/5 px-2 py-1.5 bg-transparent border border-purple-500 text-purple-500 rounded text-sm whitespace-nowrap">
              ATTACH SCREENSHOT
            </button>
            <div className="h-6"></div> {/* Spacing */}
            <button type="submit" className="w-1/4 py-1.5 bg-purple-600 text-white rounded text-sm">
              SUBMIT
            </button>
          </form>
        </div>
        
        {/* Scan to Pay Column */}
        <div className="w-full lg:w-1/3 lg:px-4 mb-6 lg:mb-0 flex flex-col items-center">
          <h2 className="text-lg mb-3">SCAN TO PAY</h2>
          <div className="bg-white p-2 rounded-lg">
            {/* Replace with an actual QR code image */}
            <div className="w-32 h-32 bg-purple-600"></div>
          </div>
        </div>

        {/* SpaceUp Logo Column */}
        <div className="w-full lg:w-1/3 lg:pl-4 flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-1">SPACEUP</h2>
            <p className="text-base">CUSAT</p>
          </div>
          {/* Add astronaut image here */}
        </div>
      </div>
      
      <footer className="mt-auto pt-4 text-center text-xs border-t border-gray-700">
        copyright © 2024 | spaceupCUSAT
      </footer>
    </div>
  )
}

export default BuyTicket