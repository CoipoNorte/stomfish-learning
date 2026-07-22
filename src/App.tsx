import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { CoursePage } from './pages/CoursePage';
import { LessonPage } from './pages/LessonPage';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename="/stomfish-learning">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/curso" element={<CoursePage />} />
          <Route path="/curso/:moduleSlug/:lessonSlug" element={<LessonPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
