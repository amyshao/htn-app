import { useState } from 'react';

export default function useIsLoggedIn() {
  const getIsLoggedIn = () => {
    // get login state from session storage, should probably be an auth token in real life
    const isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn')) || false;
    return isLoggedIn;
  }

  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn());

  const saveIsLoggedIn = loggedIn => {
    sessionStorage.setItem('isLoggedIn', loggedIn);
    setIsLoggedIn(loggedIn);
  }

  return {
    isLoggedIn,
    setIsLoggedIn: saveIsLoggedIn,
  }

}