import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {
  return (
    <div className="hero">

      <div className="hero-main">
        <h2>NEW YEARS SALES</h2>
        <h1>Up to <span>50</span>% off</h1>
        <h2>HUNDREDS OF STYLES AVAILABLE</h2>
        {/* <div> */}
        {/*   <div className="hero-hand-icon"> */}
        {/*     <p>new</p> */}
        {/*     <img src={hand_icon} alt="" /> */}
        {/*   </div> */}
        {/*   <p>collections</p> */}
        {/*   <p>for everyone</p> */}
        {/* </div> */}
        {/* <div className="hero-latest-btn"> */}
        {/*   <div>latest Collection</div> */}
        {/*   <img src={arrow_icon} alt="" /> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Hero;
