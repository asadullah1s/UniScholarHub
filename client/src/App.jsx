import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import MobileNav from './components/layout/MobileNav.jsx';

import Home from './pages/Home.jsx';
import Universities from './pages/Universities.jsx';
import UniversityDetails from './pages/UniversityDetails.jsx';
import Scholarships from './pages/Scholarships.jsx';
import ScholarshipDetails from './pages/ScholarshipDetails.jsx';
import Countries from './pages/Countries.jsx';
import CountryDetails from './pages/CountryDetails.jsx';
import Search from './pages/Search.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:country" element={<Universities />} />
          <Route path="/universities/:country/:slug" element={<UniversityDetails />} />
          {/* A university's scholarship-specific view reuses the same detail page and
              scrolls to the relevant scholarship section (see spec #18). */}
          <Route path="/universities/:country/:slug/scholarship/:scholarshipSlug" element={<UniversityDetails />} />

          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/scholarships/:slug" element={<ScholarshipDetails />} />

          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:id" element={<CountryDetails />} />

          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
