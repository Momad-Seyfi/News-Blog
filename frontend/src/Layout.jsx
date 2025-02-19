import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="content-container">
        <main className="main-content">
          <Outlet /> {/* This is where your main content will be rendered */}
        </main>
        <aside className="sidebar">
          <div className="advertisement">
            <h3>Advertisement</h3>
            <p>*Your ad content goes here*</p>
          </div>
        </aside>
      </div>
      <Footer />
      <BackToTop />
      
    </div>
  );
}

export default Layout;