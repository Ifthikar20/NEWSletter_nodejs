import { useEffect } from "react";

// Custom hook to handle outside click
export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    // Function to handle the click event
    const handleClickOutside = (event) => {
      // If the clicked element is not inside the referenced element, invoke the callback
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
