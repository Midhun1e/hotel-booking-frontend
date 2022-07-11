import React from "react";
import "../../css/room.css";

const Footer = () => {
  return (
    <div>
      <div className="w3l-footer-29-main">
        <div className="footer-29 py-5">
          <div className="container py-lg-4">
            <div className="row footer-top-29">
              <div className="col-lg-3 col-md-6 col-sm-8 footer-list-29 footer-1">
                <h6 className="footer-title-29">Contact Us</h6>
                <ul>
                  <li>
                    <p>
                      <span className="fa fa-map-marker"></span> On the banks of Neria River,Nidle,Dharmastala
                    </p>
                  </li>
                  <li>
                    <a href="#">
                      <span className="fa fa-phone"></span> +91 9483236236
                    </a>
                  </li>
                  <li>
                    <a href="#" className="mail">
                      <span className="fa fa-envelope-open-o"></span>
                      info@adithyaview.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-4 footer-list-29 footer-2 mt-sm-0 mt-5">
                <ul>
                  <h6 className="footer-title-29">Useful Links</h6>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/about">About hotel</a>
                  </li>
                  <li>
                    <a href="/signin">Login/Signup</a>
                  </li>
                  <li>
                    <a href="/contact">Contact us</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-5 footer-list-29 footer-3 mt-lg-0 mt-5">
                <h6 className="footer-title-29">Latest from blog</h6>
                <div className="footer-post mb-4">
                  <a href="blog-single.html">Work Passionately</a>
                  <p className="small">
                    <span className="fa fa-clock-o"></span> March 9, 2021
                  </p>
                </div>
                <div className="footer-post">
                  <a href="blog-single.html">Work Passionately without any hesitation</a>
                  <p className="small">
                    <span className="fa fa-clock-o"></span> March 9, 2021
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-7 footer-list-29 footer-4 mt-lg-0 mt-5">
                <h6 className="footer-title-29">Newsletter </h6>
                <p>
                  Enter your email and receive the latest news from us. We'll never share your email
                  address
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="w3l-footer-29-main w3l-copyright">
        <div className="container">
          <div className="row bottom-copies">
            <p className="col-lg-8 copy-footer-29">© 2021 HotelBook. All rights reserved </p>
            <div className="col-lg-4 main-social-footer-29">
              <a href="#facebook" className="facebook">
                <span className="fa fa-facebook"></span>
              </a>
              <a href="#twitter" className="twitter">
                <span className="fa fa-twitter"></span>
              </a>
              <a href="#instagram" className="instagram">
                <span className="fa fa-instagram"></span>
              </a>
              <a href="#linkedin" className="linkedin">
                <span className="fa fa-linkedin"></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
