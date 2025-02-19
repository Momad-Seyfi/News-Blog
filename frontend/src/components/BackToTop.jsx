import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // Import the arrow icon from react-icons

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  // Add a scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={`back-to-top ${isVisible ? "visible" : ""}`} onClick={scrollToTop}>
      <FaArrowUp className="arrow-icon" />
    </div>
  );
}

export default BackToTop;