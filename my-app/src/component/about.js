import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutComponent = () => {
  const name = "Ankur Singh";
  const image = "./images/pic_formals.jpg"; // Make sure this path is correct

  return (
    <div className="container my-5 bg-light px-4 py-2 rounded-3" id="about">
      <div className="row align-items-center">
        <div className="col-md-7">
          <div className="section-hero-data">
            <h1 className="display-4 hero-heading">{name}</h1>
            <p className="lead hero-para">
              Hi, I am {name}, a Data Science Enthusiast. I am in the final year of my B.Tech in Computer
              Science, with a focus on Machine Learning.
            </p>
          </div>
        </div>
        <div className="col-md-5 text-center">
          <picture>
            <img src={image} alt="hero" className="img-fluid rounded-circle hero-img shadow-lg border border-success" style={{ width: "200px", height: "200px" }} />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
