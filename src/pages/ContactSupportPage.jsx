import React from "react";
import "../../src/css/room.css";

const SupportPage = () => {
  return (
    <section className="w3l-contact-1 py-5">
    <div className="contacts-9 py-lg-5 py-sm-4">
        <div className="container">
            <div className="d-grid contact-view">
                <div className="cont-details">
                    <p>Get in touch</p>
                    <h3 className="title-big">Contact for Support</h3>
                </div>
                <div className="map-content-9">
                    <p></p>
                </div>
            </div>
            <div className="d-grid contact-view">
                <div className="cont-details">
                    <div className="cont-top">
                        <div className="cont-left text-center">
                            <span className="fa fa-phone text-primary"></span>
                        </div>
                        <div className="cont-right">
                  <h6>Call Us</h6>
                  <p><a href="tel:+919483236236">+91 9483236236</a></p>
                        </div>
                    </div>
                    <div className="cont-top margin-up">
                        <div className="cont-left text-center">
                            <span className="fa fa-envelope-o text-primary"></span>
                        </div>
                        <div className="cont-right">
                            <h6>Email Us</h6>
                            <p><a href="mailto:info@adithyaview.com" className="mail">info@adithyaview.com</a></p>
                        </div>
                    </div>
                    <div className="cont-top margin-up">
                        <div className="cont-left text-center">
                            <span className="fa fa-map-marker text-primary"></span>
                        </div>
                        <div className="cont-right">
                            <h6>Address</h6>
                            <p>On the banks of Neria River,<br/>Nidle,<br/>Dharmastala</p>
                        </div>
                    </div>
                </div>
                <div className="map-content-9 mt-lg-0 mt-4">
                    <form action="https://formspree.io/f/mwkazpvd" method="POST">
                        <div className="twice-two">
                            <input type="text" className="form-control" name="name" id="w3lName" placeholder="Name"
                                required="" />
                            <input type="email" className="form-control" name="_replyto" id="w3lSender" placeholder="Email"
                                required="" />
                        </div>
                        <div className="twice">
                            <input type="text" className="form-control" name="w3lSubject" id="w3lSubject"
                                placeholder="Subject" required="" />
                        </div>
                        <textarea name="message" className="form-control" id="w3lMessage" placeholder="Message"
                            required="" ></textarea>
                        <button type="submit" className="btn btn-contact">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
  );
};

export default SupportPage;
