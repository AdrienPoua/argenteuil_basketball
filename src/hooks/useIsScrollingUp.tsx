"use client"

import React, { useEffect, useState, useRef } from "react";


export function useIsScrollingUp() {
  const [scrolling, setScrolling] = useState(false);
  const prevScrollY = useRef(window.scrollY);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < prevScrollY.current ) {
        // Scrolling up
        setScrolling(true);
      } else {
        // Scrolling down or no movement
        setScrolling(false);
      }
      console.log(currentScrollY)
      prevScrollY.current = currentScrollY; // Update the ref value
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to setup and cleanup only once

  return scrolling;
}
