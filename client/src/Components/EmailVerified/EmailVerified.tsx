import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../LayoutArea/Layout/Layout';
import { logUserIn } from '../../Services/authService';
import { useCookie } from '../../hooks/useCookie';
import { toast } from 'react-hot-toast';
import UserModel from '../../Models/UserModel';

const EmailVerified = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state: ReduxState) => state.logged);
  const [authToken, setAuthToken] = useCookie('authToken');

  useEffect(() => {
    try {
      const formDataFromLocalStorage: UserModel = JSON.parse(localStorage.getItem("formData"));
      logUserIn(formDataFromLocalStorage.email, formDataFromLocalStorage.password, setAuthToken, dispatch);
      toast.success(`Welcome new user: ${formDataFromLocalStorage.first_name} ${formDataFromLocalStorage.last_name}`);
    }
    catch (error) {
      console.log(error);
    }
    finally { // needs to be cleared after async login function is done not before.
      // localStorage.clear();
    }
  }, []);

  return (
    <div>
      <h1>Email successfully verified</h1>
      {/* Add any additional content or styling you want to display */}
    </div>
  );
};

export default EmailVerified;
