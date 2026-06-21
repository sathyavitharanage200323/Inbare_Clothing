import "./Home.css";

import AnnouncementBar   from "../components/AnnouncementBar";
import Navbar            from "../components/Navbar";
import Hero              from "../components/Hero";
import Categories        from "../components/Categories";
import NewArrivals       from "../components/NewArrivals";
import FeaturedProducts  from "../components/FeaturedProducts";
import Lookbook          from "../components/Lookbook";
import AboutBrand        from "../components/AboutBrand";
import BestSellers       from "../components/BestSellers";
import Testimonials      from "../components/Testimonials";
import InstagramGallery  from "../components/InstagramGallery";
import Newsletter        from "../components/Newsletter";
import Footer            from "../components/Footer";

function Home() {
  return (
    <div className="home">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Categories />
      <NewArrivals />
      <FeaturedProducts />
      <Lookbook />
      <AboutBrand />
      <BestSellers />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
