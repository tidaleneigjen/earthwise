// src/components/Home.js
import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Menu />
      <main>
        <h2>Home Page Content</h2>
        <p>This is where you can add content specific to your home page.</p>

        <div className='content-container'>
          <img
            src={`${process.env.PUBLIC_URL}/the-goddesss-casts-the-runes.jpg`} // Ensure you provide the correct path to your image
            alt='The Goddess Casts the Runes'
            className='main-image'
          />
          <p className='announcement'>
            The Goddess Casts the Runes is available to purchase now!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
