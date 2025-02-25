import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import adImage1 from "./assets/dci-logo.png";
import adImage2 from "./assets/dci-cover.png";

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
          <a
              href="https://start.digitalcareerinstitute.org/discover-dci/?utm_feeditemid=&utm_device=c&utm_campaign_id=13121939688&utm_adgroup_id=126237567750&utm_ad_id=642136488182&utm_term=dci&utm_source=google&utm_medium=ppc&utm_campaign=DE_SEM_Brand_EN&utm_content=126237567750&hsa_cam=13121939688&hsa_mt=e&hsa_src=g&hsa_acc=9628643656&hsa_net=adwords&hsa_kw=dci&hsa_tgt=aud-1006070586653:kwd-13304966&hsa_ver=3&hsa_grp=126237567750&hsa_ad=642136488182&gad_source=1&gclid=Cj0KCQiA8fW9BhC8ARIsACwHqYojK-c80MWv6UNFSNmgCyibYFySQcMtwb-0QzXtyOtHYg83zioQ-2oaAg9vEALw_wcB" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1>The first step into a
              secure career!</h1>
              <img src={adImage1} alt="DCI Logo" className="ad-image" />
              <p>Further Education in IT and Digital Business</p>
             
              <h3>Check if you qualify for a 100% Financed course. Select your state to get started</h3>

              <img src={adImage2} alt="DCI cover" className="ad-image" />
            <h2>
              <span className="glow-text">Take part in our courses for free </span>
            </h2> 
              <h4>Our courses can be funded with a Bildungsgutschein (education voucher) from the Agentur für Arbeit or Jobcenter. All costs are covered, and you won’t have to pay anything back later. </h4>

            </a>
          </div>
        </aside>
      </div>
      <Footer />
      <BackToTop />
      
    </div>
  );
}

export default Layout;