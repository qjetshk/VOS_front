import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import Main from "./pages/Main";
import Layout from "./components/Layout";
import Reg from "./pages/Reg";
import Auth from "./pages/Auth";
import Add from "./pages/Add";
import Personal from "./pages/Personal";
import DashBoard from "./pages/DashBoard";
import CardDetails from "./pages/CardDetails";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <div className="cont">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/reg" element={<Reg />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/add" element={<Add />} />
              <Route path="/personal" element={<Personal />} />
            </Route>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/event/:id" element={<CardDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
