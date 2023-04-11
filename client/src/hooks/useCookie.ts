import { useState, useEffect } from 'react';

export function useCookie(cookieName: string): [string | null, (value: string, minutes: number) => void, () => void] {

  const [cookieValue, setCookieValue] = useState(() => getCookie(cookieName));

  function setCookie(name: string, value: string, minutes: number) {

    let expires = '';
    if (minutes) {
      const date = new Date();
      date.setTime(date.getTime() + (minutes * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  function getCookie(name: string) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function setCookieValueAndSave(value: string, minutes: number) {
    setCookie(cookieName, value, minutes);
    setCookieValue(value);
  }
  function deleteCookie(name: string) {
    setCookie(name, '', -1);
  }

  function removeCookie() {
    deleteCookie(cookieName);
    setCookieValue(null);
  }

  useEffect(() => {
    const newValue = getCookie(cookieName);
    if (cookieValue !== newValue) {
      setCookieValue(newValue);
    }
  }, [cookieValue, cookieName]);

  return [cookieValue, setCookieValueAndSave,removeCookie];
}