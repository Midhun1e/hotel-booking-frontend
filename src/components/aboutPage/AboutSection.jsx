import React from "react";
import img1 from "../../images/kinderplay.jpg";
import img2 from "../../images/restuarant.jpg";
import img3 from "../../images/pool.jpg";

function AboutSection() {
  return (
    <div className="w3l-about-us best-rooms py-5">
      <div className="container py-lg-5 py-sm-4 mt-5">
        <div className="maghny-gd-1">
          <div className="row about-text">
            <div className="col-lg-6">
              <h3 className="title-big mt-3">
                Best luxury Hotel in karnataka since 2000. Our hotel has been present for over 20
                years.
              </h3>
            </div>
            <div className="col-lg-6">
              <p>
              Our Hotels are boutique property with valley views. It is attuned to the surrounding environment through a thoughtful design that respects Indian rich artistry and cultural heritage. Providing a restaurant, the property also has a garden. Guests can enjoy pool views. The units in the hotel are fitted with a flat-screen TV with satellite channels. The private bathroom is equipped with a shower. Speaking English, Hindi and Kannada, staff are always on hand to help at the reception.
              </p>
              {/* <p className="mt-3">
                Hotel Adithya View is located in Dharamasthala, 2KM from Dharamasthala Temple.
                Providing a restaurant, the property also has a garden. Guests can enjoy pool views.
                The units in the hotel are fitted with a flat-screen TV with satellite channels. The
                private bathroom is equipped with a shower. Speaking English, Hindi and Kannada,
                staff are always on hand to help at the reception.
              </p> */}
            </div>
          </div>
          <div className="row mt-5">
            <div className="maghny-gd-1 col-lg-4 col-md-6">
              <div className="maghny-grid">
                <figure className="effect-lily border-radius">
                  <img className="img-fluid" src={img1} />
                  <figcaption className="w3set-hny">
                    <div>
                      <h4>
                      Kinder Play
                        {/* Top Restaurant <span> Hotels</span> */}
                      </h4>
                      <p>A play area for small kids with play equipments.</p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="maghny-gd-1 col-lg-4 col-md-6 mt-md-0 mt-4">
              <div className="maghny-grid">
                <figure className="effect-lily border-radius">
                  <img alt="" className="img-fluid" src={img2} />
                  <figcaption className="w3set-hny">
                    <div>
                      <h4>
                      Restaurant
                      </h4>
                      <p>Variety of food of your choice.</p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="maghny-gd-1 col-lg-4 col-md-6 mt-lg-0 mt-4">
              <div className="maghny-grid">
                <figure className="effect-lily border-radius">
                  <img alt="" className="img-fluid" src={img3} />
                  <figcaption className="w3set-hny">
                    <div>
                      <h4>
                      Swimming Pool
                      </h4>
                      <p>Beautiful swimming pool for relaxation.</p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
