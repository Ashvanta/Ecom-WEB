import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer() {
  return (
    

    <footer className="site-footer">
       
       <div className="footer-divider" />

      {/* Top assurance strip */}
      <div className="footer-assurance">
        <div>
          <h4>FREE DELIVERY</h4>
          <p>For orders over ₹2000</p>
        </div>
        <div>
          <h4>FREE RETURNS</h4>
          <p>Seamless & hassle-free returns</p>
        </div>
        <div>
          <h4>SECURE PAYMENT</h4>
          <p>Visa, Mastercard, PayPal, UPI</p>
        </div>
      </div>

      <div className="footer-divider" />

      {/* Main footer grid */}
      <div className="footer-grid">
        {/* NEED HELP */}
        <div>
          <h5>NEED HELP?</h5>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/returns">Want to make a return?</a></li>
            <li><a href="/order-tracking">Track my order</a></li>
          </ul>

          <p className="footer-label">Contact:</p>
          <p>Email: hello@ashvanta.com</p>
          <p>WhatsApp</p>
          <p>Instagram: @ashvanta</p>

          <p className="footer-label">Useful Information:</p>
          <ul>
            <li><a href="/account">My Account</a></li>
            <li><a href="/delivery">My Delivery</a></li>
            <li><a href="/returns">My Returns</a></li>
          </ul>
        </div>

        {/* ABOUT */}
        <div>
          <h5>ABOUT</h5>
          <ul>
            <li><a href="/about">A Word from Ashvanta</a></li>
            <li><a href="/commitment">Our Commitments</a></li>
            <li><a href="/legal">Legal Notices</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/accessibility">Digital Accessibility</a></li>
            <li><a href="/careers">Join Us</a></li>
          </ul>
        </div>

        {/* LOCATIONS */}
        <div>
          <h5>OUR LOCATIONS</h5>
          <ul>
            <li>New Delhi</li>
            <li>Mumbai</li>
            <li>Bangalore</li>
            <li>Hyderabad</li>
            <li>Chennai</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h5>SUBSCRIBE TO OUR NEWSLETTER</h5>
          <div className="footer-newsletter">
            <input placeholder="Your e-mail address" />
            <button>OK</button>
          </div>

          <div className="footer-socials">
            <span>IG</span>
            <span>X</span>
            <span>FB</span>
            <span>YT</span>
          </div>

          <p className="footer-small">
            Change delivery country: <strong>India</strong><br />
            Language: <strong>English</strong>
          </p>
        </div>
      </div>

      {/* Brand signature */}
      <div className="footer-brand">Ashvanta</div>
    </footer>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
