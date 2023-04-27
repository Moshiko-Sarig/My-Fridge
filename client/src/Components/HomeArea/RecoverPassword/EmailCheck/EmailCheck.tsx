import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import UserModel from '../../../../Models/UserModel';

function EmailCheck(): JSX.Element {
  const [email, setEmail] = useState('');
  const [emailExists, setEmailExists] = useState(null);
  const [emailVerified, setEmailVerified] = useState(null);

  const checkEmailExists = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/checkEmail', { email });
      setEmailExists(response.data.email_verified as UserModel);
      console.log(response.data.email_verified as UserModel);
      
      setEmailVerified(response.data.emailVerified);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/send-verification-email', { email });
      toast.success('Verification email sent!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await checkEmailExists();

    if (emailExists === false) {
      toast.error('Email not found. Please register.');
      return;
    }

    if (emailVerified === false) {
      toast.error('Email not verified. Please verify your email first.');
      return;
    }

    try {
      const responsePromise = axios.post('http://localhost:4000/api/v1/send-restart-password-email', { email });

      await toast.promise(
        responsePromise,
        {
          loading: 'Sending email...',
          success: 'Email sent successfully!',
          error: 'Failed to send email.',
        },
      );
      const response = await responsePromise;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Toaster position='top-center' reverseOrder={true} />
      <h1>Password Recover</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {emailExists === false && (
        <div>
          <p>Email not found. Please register:</p>
          <NavLink to="/register">Register</NavLink>
        </div>
      )}
      {emailVerified === false && (
        <div>
          <p>Your email is not verified. Click the button below to resend the verification email.</p>
          <button onClick={handleResendVerification}>Resend Verification Email</button>
        </div>
      )}
    </div>
  );
}

export default EmailCheck;
