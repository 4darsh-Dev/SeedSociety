import React from "react";
import Categories from "../components/Marketplace/Categories";
import FeaturedProducts from "../components/Marketplace/FeaturedProducts";
import MarketHero from "../components/Marketplace/MarketHero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MarketHome = () => {
    return (
      <main>
        <Navbar />
        <MarketHero />
        <FeaturedProducts />
        <Categories />
        <Footer />
      </main>
    );
  };
  
  export default MarketHome;