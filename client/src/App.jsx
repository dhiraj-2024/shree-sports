import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import SuccessStories from "./components/SuccessStories";
import Register from "./pages/Register";
import GymnasticsForm from "./components/Forms/GymnasticsForm";
import AdultFitnessForm from "./components/Forms/AdultFitnessForm";
import Staff from "./pages/Staff";
import News from "./pages/News";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import PageNotFound from "./pages/PageNotFound";

// Admin Components
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/Dashboard";
import GymnasticsRegistrations from "./components/Admin/GymnasticsRegistrations";
import AdultFitnessRegistrations from "./components/Admin/AdultFitnessRegistrations";
import ContactRegistrations from "./components/Admin/ContactRegistrations";
import AdminNews from "./components/Admin/AdminNews";
import FeedbackManagement from "./components/Admin/FeedbackManagement";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/gallery" element={<><Navbar /><Gallery /><Footer /></>} />
          <Route path="/success-stories" element={<><Navbar /><SuccessStories /><Footer /></>} />
            <Route path="/register" element={<><Navbar /><Register /><Footer /></>}>
            <Route index element={<GymnasticsForm />} />
            <Route path="gymnastics" element={<GymnasticsForm />} />
            <Route path="adult-fitness" element={<AdultFitnessForm />} />
          </Route>
          <Route path="/staff" element={<><Navbar /><Staff /><Footer /></>} />
          <Route path="/news" element={<><Navbar /><News /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
          
          {/* Admin Routes */}
          <Route path="/shreeadmin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="gymnastics" element={<GymnasticsRegistrations />} />
            <Route path="adult-fitness" element={<AdultFitnessRegistrations />} />
            <Route path="contact-data" element={<ContactRegistrations />} />
            <Route path="feedback" element={<FeedbackManagement />} />
            <Route path="news" element={<AdminNews />} />
          </Route>
          
          {/* 404 Page */}
          <Route path="*" element={<><Navbar /><PageNotFound /><Footer /></>} />
        </Routes>
      </div>

    </HashRouter>
  );
}