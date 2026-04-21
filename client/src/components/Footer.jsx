import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BiMailSend } from "react-icons/bi";
import "../styles/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div className="footer-brand">
            <h2 className="footer-title">
              FaceFit <span className="footer-highlight">Eyewear</span>
            </h2>
            <p className="footer-text">
              Experience the future of eyewear with AI-powered recommendations,
              virtual try-on, and perfectly fitted glasses delivered to your door.
            </p>

            <div className="footer-social">
              <FaFacebook className="social-icon facebook" size={20} />
              <FaInstagram className="social-icon instagram" size={20} />
              <FaXTwitter className="social-icon twitter" size={20} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3 className="footer-subtitle">Quick Links</h3>
            <ul>
              <li>Shop Glasses</li>
              <li>Virtual Try-On</li>
              <li>AI Recommendations</li>
              <li>New Arrivals</li>
              <li>Offers & Deals</li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="footer-links">
            <h3 className="footer-subtitle">Customer Support</h3>
            <ul>
              <li>Contact Us</li>
              <li>Order Tracking</li>
              <li>Shipping & Returns</li>
              <li>Frame Size Guide</li>
              <li>Lens Information</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h3 className="footer-subtitle">Stay Connected</h3>
            <p className="footer-text">
              Subscribe for exclusive eyewear updates, new launches, and vision care tips.
            </p>

            <div className="newsletter-input">
              <input type="email" placeholder="Your email address" />
              <button>
                <BiMailSend size={16} />
              </button>
            </div>

            <p className="footer-text mt-2">support@facefiteyewear.com</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FaceFit Eyewear. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;