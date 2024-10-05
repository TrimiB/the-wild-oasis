import { useEffect, useRef } from 'react';

export function useCloseModal(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function closeModal(e) {
      if (e.key === 'Escape' || (ref.current && !ref.current.contains(e.target))) handler();
    }

    document.addEventListener('keydown', closeModal, listenCapturing);
    document.addEventListener('click', closeModal, listenCapturing);

    return () => {
      document.removeEventListener('keydown', closeModal, listenCapturing);
      document.removeEventListener('click', closeModal, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
