import React from "react";
import bgFooter from "../../assets/images/footer.png";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <section className="p-11">
      <footer
        style={{
          background: `url(${bgFooter})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%"
        }}
        className="footer px-5 md:px-10 md:justify-evenly"
      >
        <div>
          <span className="footer-title">SERVICES</span>
          <Link className="link link-hover">Emergency Checkup</Link>
          <Link className="link link-hover">Monthly Checkup</Link>
          <Link className="link link-hover">Weekly Checkup</Link>
          <Link className="link link-hover">Deep Checkup</Link>
        </div>
        <div>
          <span className="footer-title">ORAL HEALTH</span>
          <Link className="link link-hover">Fluoride Treatment</Link>
          <Link className="link link-hover">Cavity Filling</Link>
          <Link className="link link-hover">Teeth Whitening</Link>
        </div>
        <div>
          <span className="footer-title">OUR ADDRESS</span>
          <p>New York - 101010 Hudson</p>
        </div>
      </footer>
      <p className="text-center mt-10 md:mt-0">Copyright © 2022 - All right reserved</p>
    </section>
  );
};

export default Footer;
