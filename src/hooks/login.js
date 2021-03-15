import { useState } from 'react';

export default function useIsLoggedIn() {
  const getIsLoggedIn = async () => {
    const isLoggedIn = await JSON.parse(sessionStorage.getItem('isLoggedIn')) || false;
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