// client/src/pages/Home.jsx
import { motion } from "framer-motion";
import HeroSection from "../components/HomeComponents/HeroSection";
import Feedback from "../components/Feedback";
import HomeAbout from "../components/HomeComponents/HomeAbout";

export default function Home() {
  return (
    <div className="home-page">

      <HeroSection />
      <HomeAbout/>
      <Feedback/>
    </div>
  );
}
