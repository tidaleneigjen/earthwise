// src/components/Home.js
import React from "react";

const Home = () => {
  return (
    <>
      <section className='hero'>
        <h2>Home Page Content</h2>
        <p>This is where you can add content specific to your home page.</p>
      </section>

      <section className='card'>
        <div className='content-container'>
          <img
            src={`${process.env.PUBLIC_URL}/the-goddess-casts-the-runes.jpg`}
            alt='The Goddess Casts the Runes'
            className='main-image'
          />
          <p className='announcement'>
            The Goddess Casts the Runes is available to purchase now!
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
