import React from "react";
import img1 from "../../images/top.jpg";
import img2 from "../../images/bottom.jpg";
import {Link} from "react-router-dom";

function AboutHome() {
    return (
        <section className="w3l-about py-5">
	<div className="container py-sm-4">
		<div className="row">
			<div className="col-lg-6 about-left mb-md-0 mb-5">
				<h3 className="title-big">Relax in our Hotels</h3>
				<h5>We make the best for all our customers.</h5>
				<p className="mt-3">Our Hotels are boutique property with valley views. It is attuned to the surrounding environment through a thoughtful design that respects Indian rich artistry and cultural heritage. Providing a restaurant, the property also has a garden. Guests can enjoy pool views. The units in the hotel are fitted with a flat-screen TV with satellite channels. The private bathroom is equipped with a shower. Speaking English, Hindi and Kannada, staff are always on hand to help at the reception.</p>
                    <Link to="/about" ><button className="btn btn-style btn-primary mt-sm-5 mt-4">Learn About Us</button></Link>
			</div>
			<div className="col-lg-6 about-right position-relative mt-lg-0 mt-5">
				<img src={img2} alt="" className="img-fluid img-border mt-4" />
				<img src={img1} alt="" className="img-fluid position-absolute img-position" />
			</div>
		</div>
	</div>
</section>
    )
}

export default AboutHome;
