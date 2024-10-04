import React from "react";

const PrevImages = () => {
  // Inline styles
  const pageContainerStyle = {
    padding: "20px",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    marginLeft: "200px",
    display: "flex", // Keep flex layout for side-by-side display
  };

  const galleryStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    maxWidth: "50%", // Set to 50% to keep it in the right position
    marginLeft: "30px",
  };

  const imgStyle = {
    height: "500px", // Increased height for a larger image
    objectFit: "fill",
  };

  const contactSectionStyle = {
    maxWidth: "45%",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
    marginLeft: "10px",
  };

  const btnStyle = {
    backgroundColor: "#9B3CCA", // Button color set here
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "20px",
  };

  const cardStyle = {
    backgroundColor: "#333", // Card background color
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
    marginTop: "20px", // Space between the button and the card
    position: "relative", // To position icons absolutely
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#fff", // Title color
    textDecoration: "underline", // Underline for the title
  };

  const personStyle = {
    marginBottom: "10px",
  };

  const nameStyle = {
    color: "#9B3CCA", // Text color for "Name Here"
  };

  const phoneStyle = {
    color: "#fff", // Keep the phone number color unchanged
  };

  const socialMediaStyle = {
    position: "absolute", // Position icons absolutely within the card
    bottom: "20px", // Position from bottom
    right: "20px", // Position from right
    display: "flex", // Display icons in a row
    alignItems: "center", // Vertically align icons
  };

  const iconStyle = {
    color: "#fff",
    marginRight: "10px",
    fontSize: "20px", // Adjust icon size
  };

  const footerStyle = {
    marginTop: "20px",
    color: "#777",
  };

  return (
    <div style={pageContainerStyle}>
      {/* Contact Section */}
      <div style={contactSectionStyle}>
        <p>
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
        <button style={btnStyle}>Get Tickets</button>

        {/* Connect Us Card */}
        <div style={cardStyle}>
          <div style={titleStyle}>CONNECT US</div>
          <div style={personStyle}>
            <p style={nameStyle}>Name Here</p>
            <p style={phoneStyle}>+91 9876 123 456</p>
          </div>
          <div style={personStyle}>
            <p style={nameStyle}>Name Here</p>
            <p style={phoneStyle}>+91 9876 123 456</p>
          </div>

          {/* Social Media Icons */}
          <div style={socialMediaStyle}>
            <a href="https://linkedin.com" style={iconStyle}>
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://instagram.com" style={iconStyle}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" style={iconStyle}>
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        <footer style={footerStyle}>
          <p>copyright &copy; 2024 | spaceupcusat</p>
        </footer>
      </div>

      {/* Gallery Section */}
      <div style={galleryStyle}>
        <img src="pic.png" alt="Space Image" style={imgStyle} />
        {/* Add more images here */}
      </div>
    </div>
  );
};

export default PrevImages;
