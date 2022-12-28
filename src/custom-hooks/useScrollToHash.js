import { useEffect } from 'react';

export default function useScrollToHash() {
  useEffect(() => {
    setTimeout(() => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'instant' });
        }
      }
    }, 100);
  }, []);
}
