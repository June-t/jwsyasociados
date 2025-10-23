import Logo from "@/app/assets/logo.png";
export default function Header() {
  return (
    <header className='header'>
      <div className='header__banner'>
        <span>
          Are you Ready to Free Business Consulting Today?
          <a href='#'>Contact Us</a>
        </span>
        <span>
          Call Us Now: <a>+1 (829) 456-7890</a>
        </span>
      </div>
      <div className='header__navegation'>
        <div className='header__logo'>
          <img src={Logo.src} alt='JWS Y Asociados Logo' />
        </div>
        <div className='header__nav'>
          <ul className='header__nav-list'>
            <li className='header__nav-item'>
              <a href='#'>Industries</a>
            </li>
            <li className='header__nav-item'>
              <a href='#'>Consulting Services</a>
            </li>
            <li className='header__nav-item'>
              <a href='#'>Digital</a>
            </li>
            <li className='header__nav-item'>
              <a href='#'>Insights</a>
            </li>
            <li className='header__nav-item'>About</li>
            <li className='header__nav-item'>Careers</li>
          </ul>
        </div>
        <div className='header__menu'>
          <button className='btn__primary'>Contact Us</button>
          <div className='btn__menu'></div>
        </div>
      </div>
    </header>
  );
}
