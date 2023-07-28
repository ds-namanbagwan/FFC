import { useState, useEffect } from 'react';
import * as React from "react";
import { IoIosArrowDropup} from "react-icons/io";


const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top coordinate to 0
  // Make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup code to remove event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div className="scrollToTopButton"><button onClick={scrollToTop}>
          {/* Scroll to top */}
          <IoIosArrowDropup  style={{fontSize:"2.5em", color:"black"}}/>
        </button>
        </div>
      )}
    </div>
  );
};

export default ScrollUp;