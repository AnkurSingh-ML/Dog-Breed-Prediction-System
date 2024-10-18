import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../styles/Button';
import { useGlobalContext } from '../context';

const HeroSection = ({name,image}) => {
    
  const firstName = useGlobalContext();
  return (
    <Wrapper>
      <div className="container grid grid-two-column">
      <div className="section-hero-data">
        <p className='hero-top-data'>THIS IS ME</p>
        <h1 className='hero-heading'>{name}</h1>
        <p className='hero-para'>Hi Iam {firstName} Thakur.A Software Engineer. I believe I can contribute effectively to your team by bringing innovative solutions</p>
        <Button className='btn hireme-btn'>
        <NavLink to = "/contact">Hire Me</NavLink>
      </Button>
      </div>
      {/* for image  */}
      <div className="section-hero-image">
        <picture>
          <img src={image} alt="hero image"  className='hero-img'/>
        </picture>
      </div>
      </div>
    </Wrapper>
  );
}