export default function Header() {
  return (
    <header className="header">
      <div className="header__banner"></div>
      <div className="header__navegation">
        <div className="header__logo">
          <img src="/logo-jws.png" alt="JWS Y Asociados Logo" />
        </div>
        <div className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">Industries</li>
            <li className="header__nav-item">Consulting Services</li>
            <li className="header__nav-item">Digital</li>
            <li className="header__nav-item">Insights</li>
            <li className="header__nav-item">About</li>
            <li className="header__nav-item">Careers</li>
          </ul>
        </div>
        <div className="header__menu">
          <button className="btn__primary">Contact Us</button>
          <div className="btn__menu"></div>
        </div>
      </div>
    </header>
  );
}
