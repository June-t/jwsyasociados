import {
  IconArrowUpRight,
  IconCircleCheckFilled,
  IconShieldCheckFilled,
} from "@tabler/icons-react";

export default function Main() {
  return (
    <>
      <section className='main__hero'>
        <div className='hero__slider'>
          <span>Smarter Strategies Stronger Businesses</span>
          <h1>
            Experience Driven <br /> Consulting Results <br /> You Can Count On
          </h1>
          <p>
            Whether you're Icmng to streamline operations, scale sustainably, or
            navigate complex challenges, our consulting services are built to
            deliver measurable results and long-term impact & hands support.
          </p>
          <a href='#' className='btn__primary--search'>
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            A Free Consulting
          </a>
        </div>
        <div className='hero__progress'>
          <div className='progress__status'>
            <span>01</span>
          </div>
          <div className='progress__line' />
          <div className='progress__total'>
            <span>/04</span>
          </div>
        </div>
      </section>
      <section className='main__about'>
        <div className='about__image'></div>
        <div className='about__content'>
          <span>About Us</span>
          <h2>
            Smart Strategy Meets the Human Insight That's How We Help You Grow
          </h2>
          <p>
            Whether you're Icmng to streamline operations, scale sustainably, or
            navigate complex challenges, our consulting services are built to
            deliver measurable results and long-term impact & hands support.
            <br />
            <br />
            Consulting services are built to deliver measurable results and
            long-term impact & hands support.
          </p>
          <div className='about__content--dips'>
            <div className='dips__item'>
              <span>
                <IconCircleCheckFilled />
              </span>
              <h4>Partner First Consultant Second</h4>
            </div>
            <div className='dips__item'>
              <span>
                <IconCircleCheckFilled />
              </span>
              <h4>Your Growth is Our Business</h4>
            </div>
            <div className='dips__item'>
              <span>
                <IconCircleCheckFilled />
              </span>
              <h4>Behind the Strategy</h4>
            </div>
          </div>
          <a href='#' className='btn__primary--search btn__primary--dark'>
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            A Free Consulting
          </a>
        </div>
      </section>
      <section className='main__services'>
        <div className='services__content'>
          <span>Our Services</span>
          <h2>Smart Strategy Meets the Human Insight That's Ho</h2>
          <a href='#' className='btn__primary--search'>
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            A Free Consulting
          </a>
          <div className='services__paragraph'>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
        </div>
        <div className='services__grid'>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
        </div>
      </section>
      <section className='main__clients'>
        <div className='clients'>
          <span>Our Portfolio</span>
          <h2>Client Wins & Case Studies</h2>
        </div>
        <div className='clients__grid'>
          <div className='clients__item'>
            <div className='clients__item--icon'></div>
            <h4>John Smith</h4>
            <span>Founder of EcoGods</span>
            <p>
              "The consulting services provided were transformative for our
              business. Their insights and strategies helped us achieve
              significant growth and operational efficiency."
            </p>
          </div>
          <div className='clients__brand'></div>
          <div className='clients__item'></div>
        </div>
      </section>
      <section className='main__work'></section>
      <section className='main__team'></section>
      <section className='main__contact'></section>
    </>
  );
}
