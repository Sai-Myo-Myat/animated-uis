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
        <nav className="p-4">
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium text-lg"
          >
            Fluffy HUGS
          </Link>
        </nav>
        <main className="w-screen overflow-x-hidden relative p-4">
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
