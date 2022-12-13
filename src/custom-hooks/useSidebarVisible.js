import { useState, useEffect, useRef } from 'react';

export default function useSidebarVisible(initialIsVisible) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(initialIsVisible);
  const sidebarRef = useRef(null);

  const handleClickOutside = event => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { sidebarRef, isSidebarVisible, setIsSidebarVisible };
}
