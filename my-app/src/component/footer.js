import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

const FooterComponent = () => {  
  return (
    <footer className="bg-dark text-light py-4" id="contactUs">
      <Container>
        <Row>
          {/* Professional Links Section */}
          <Col md={4} className="mb-3">
            <h5>Professional Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://github.com/AnkurSingh-ML/" target="_blank" rel="noopener noreferrer" className="text-light">
                  <FaGithub className="me-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ankursingh-ml/" target="_blank" rel="noopener noreferrer" className="text-light">
                  <FaLinkedin className="me-2" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:ankur.singh.ml.2025@gmail.com" className="text-light">
                  <FaEnvelope className="me-2" />
                  Email
                </a>
              </li>
            </ul>
          </Col>

          {/* Social Media Section */}
          <Col md={4} className="mb-3">
            <h5>Social Media</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-light">
                  <FaFacebook className="me-2" />
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-light">
                  <FaInstagram className="me-2" />
                  Instagram
                </a>
              </li>
            </ul>
          </Col>

          {/* Address and Contact Section */}
          <Col md={4} className="mb-3">
            <h5>Contact</h5>
            <address>
              <p>
                Mundian Khurd, <br />
                Ludhiana, Punjab, 141123
              </p>
              <p>Phone: (+91) 6280270582</p>
            </address>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; Ankur Singh. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
