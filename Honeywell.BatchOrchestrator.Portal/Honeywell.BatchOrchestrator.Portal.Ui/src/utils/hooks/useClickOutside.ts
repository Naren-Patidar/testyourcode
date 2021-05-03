import { useCallback, useEffect, useRef, useState } from 'react';

export const useClickOutSide = (ref, callback) => {
  const handleClick = (event) => {
    if (ref && ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };
  useEffect(() => {
    // Bind the event listener
    document.addEventListener('click', handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
};
