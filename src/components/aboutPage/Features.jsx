import React from "react";

function Features() {
  return (
    <section className="w3l-stats">
      <div className="main-w3 py-5">
        <div className="container py-lg-3">
          <div className=" align-items-center" style={{display: "flex"}}>
            <div className="col-lg-6 main-cont-wthree-fea text-center">
              <div className="row">
                <div className="col-6 pr-2 mt-4">
                  <div className="grids-speci1">
                    <span className="fa fa-users"></span>
                    <h3 className="title-spe">1200+</h3>
                    <p>Happy Clients</p>
                  </div>
                </div>
                <div className="col-6 pl-2 mt-4">
                  <div className="grids-speci1">
                    <span className="fa fa-camera"></span>
                    <h3 className="title-spe">18k+</h3>
                    <p>Luxury Rooms</p>
                  </div>
                </div>
                <div className="col-6 pr-2 mt-4">
                  <div className="grids-speci1">
                    <span className="fa fa-briefcase"></span>
                    <h3 className="title-spe">158</h3>
                    <p>Employers</p>
                  </div>
                </div>
                <div className="col-6 pl-2 mt-4">
                  <div className="grids-speci1">
                    <span className="fa fa-comments"></span>
                    <h3 className="title-spe">879+</h3>
                    <p>Services</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 title" style={{marginLeft: "10px"}}>
              <h3 className="title-big">We have a great funfact! Relax & Enjoy your Holiday</h3>
              <p className="mt-4">
              The Group's commitment to excellence, attention to detail and personalised service has ensured a loyal list of guests and accolades in the worldwide hospitality industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
