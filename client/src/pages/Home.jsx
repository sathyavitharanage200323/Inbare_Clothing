import "./Home.css";

import AnnouncementBar   from "../components/AnnouncementBar";
import Hero              from "../components/Hero";
import Categories        from "../components/Categories";
import FeaturedToteBag   from "../components/FeaturedToteBag";
import NewArrivals       from "../components/NewArrivals";
import FeaturedProducts  from "../components/FeaturedProducts";
import Lookbook          from "../components/Lookbook";
import AboutBrand        from "../components/AboutBrand";
import BestSellers       from "../components/BestSellers";
import Testimonials      from "../components/Testimonials";
import InstagramGallery  from "../components/InstagramGallery";
import Newsletter        from "../components/Newsletter";

function Home() {
  return (
    <div className="home">
      <AnnouncementBar />
      <Hero />
      <Categories />
      <FeaturedToteBag />
      <NewArrivals />
      <FeaturedProducts />
      <Lookbook />
      <AboutBrand />
      <BestSellers />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </div>
  );
}

export default Home;
