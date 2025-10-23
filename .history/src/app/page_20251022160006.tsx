import { IconSearch } from "@tabler/icons-react";

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
          <a href='#'>
            <IconSearch />A Free Consulting
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
      <section className='main__about'></section>
      <section className='main__services'></section>
      <section className='main__clients'></section>
      <section className='main__work'></section>
      <section className='main__team'></section>
      <section className='main__contact'></section>
    </>
  );
}
