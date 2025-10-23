import Logo from "@/app/assets/logo.png";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__head'>
        <p>Smart Strategy Meets the Human Insight That's How</p>
      </div>
      <div className='footer__main'>
        <div className='main__logo'>
          <img src={Logo.src} alt='JWS Y Asociados Logo' />
          <p>
            When a buyer is interested in one of your listings, they will
            contact you through the information you provided when you set up
            your account.
          </p>
          <div className='main__logo--links'>
            <a href='#'>Facebook</a>
            <a href='#'>Twitter</a>
            <a href='#'>LinkedIn</a>
            <a href='#'>Instagram</a>
          </div>
        </div>
        <div className='main__nav'>
          <div className='main__nav--item'>
            <h4>Company</h4>
            <a href='#'>About Us</a>
            <a href='#'>Pricing Plan</a>
            <a href='#'>FAQ</a>
          </div>
          <div className='main__nav--item'>
            <h4>Navegation</h4>
            <a href='#'>Industries</a>
            <a href='#'>Consulting Services</a>
            <a href='#'>Digital</a>
            <a href='#'>Insights</a>
            <a href='#'>About</a>
            <a href='#'>Careers</a>
          </div>
          <div className='main__nav--item'>
            <h4>Phone</h4>
            <a href='#'>+1 (829) 374-9960</a>
          </div>
          <div className='main__nav--item'>
            <h4>Email</h4>
            <a href='#'>name@email.com</a>
          </div>
          <div className='main__nav--item'>
            <a href='#' className='btn__primary--search'>
              <div className='btn__icon'>
                <IconArrowUpRight />
              </div>
              A Free Consulting
            </a>
          </div>
        </div>
      </div>
      <div className='footer__down'>
        <span>© 2025 JW&Asociados Consulting Group | All rights reserved</span>
        <span>Privacy Policy</span>
      </div>
    </footer>
  );
}
