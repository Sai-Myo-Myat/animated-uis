import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/screens/home-screen";
import Gallery from "./components/screens/gallery-screen";
import TransactionBackground from "./components/transaction-background";
import { NavigationProvider } from "./contexts/navigation-context";

const App: React.FC = () => (
  <Router>
    <NavigationProvider>
      <div className="min-h-screen w-[100vw] overflow-x-hidden">
        {/* Top navigation bar */}
        <Link
          to="/"
          className="text-blue-600 hover:underline font-bold text-4xl fixed left-10 top-4 z-50"
        >
          Fluffy HUGS
        </Link>
        <main className="min-w-screen min-h-screen overflow-x-hidden relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <TransactionBackground />
      </div>
    </NavigationProvider>
  </Router>
);

export default App;
