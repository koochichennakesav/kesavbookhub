import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const FooterView = () => (
  <footer className="footer-home-section">
    <div className="icon-container">
      <a rel="noreferrer" href="https://www.google.com/" target="_blank">
        <FaGoogle className="icons" />
      </a>
      <a rel="noreferrer" href="https://www.twitter.com" target="_blank">
        <FaTwitter className="icons" />
      </a>
      <a rel="noreferrer" href="https://www.instagram.com" target="_blank">
        <FaInstagram className="icons" />
      </a>
      <a rel="noreferrer" href="https://www.youtube.com" target="_blank">
        <FaYoutube className="icons" />
      </a>
    </div>
    <p className="contact-us">Contact us</p>
  </footer>
)

export default FooterView
