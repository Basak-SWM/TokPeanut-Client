import React from "react";
import landing_image from "../image/landing_image.png";

const LandingPage = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#F38025",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img src={landing_image} alt="landing" />
    </div>
  );
};

export default LandingPage;
