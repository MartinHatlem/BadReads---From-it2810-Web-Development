import { Routes, Route, Navigate } from "react-router-dom";
import AboutBookPage from "./pages/AboutBookPage";
import HomePage from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <section className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/project2" element={<HomePage />} />
          {/* Redirect any unknown routes to /project2 */}
          <Route path="*" element={<Navigate to="/project2" />} />
          <Route
            path="/project2/aboutBook/:bookID"
            element={<AboutBookPage />}
          />
        </Routes>
      </main>
      <Footer />
    </section>
  );
}

export default App;
