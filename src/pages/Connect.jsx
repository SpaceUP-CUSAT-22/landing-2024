import React from 'react';
import { Phone } from 'lucide-react';

const Connect = () => {
  const contacts = [
    {
      name: "Aditya Kurup",
      role: "Event Coordinator",
      phone: "9553685246"
    },
    {
      name: "Jithin",
      role: "Technical Lead",
      phone: "9633452202"
    }
  ];

  const handleContact = (contact) => {
    if (contact.isEmail) {
      window.location.href = `mailto:${contact.phone}`;
    } else {
      window.location.href = `tel:${contact.phone}`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 py-4 px-6">
        <h1 className="text-2xl font-bold text-center">Contact Us</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Info Card */}
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <div className="p-6">
            <h2 className="text-xl text-center text-purple-400 font-semibold mb-4">Need Help?</h2>
            <p className="text-center text-gray-300">
              Our team is here to assist you with any queries about SpaceUp CUSAT.
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200"
            >
              <div>
                <h3 className="font-semibold text-lg">{contact.name}</h3>
                <p className="text-gray-400 text-sm">{contact.role}</p>
              </div>
              <button
                onClick={() => handleContact(contact)}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Phone size={18} />
                <span>{contact.isEmail ? "Email" : "Call"}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info Card */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 mt-8">
          <div className="p-6 text-center">
            <p className="text-gray-300">
              Available during event hours<br />
              Quick response guaranteed
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto p-4 text-center text-xs border-t border-gray-800">
        &copy; 2024 SpaceUp CUSAT. All rights reserved.
      </footer>
    </div>
  );
};

export default Connect;