// RestartPassword.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RestartPassword(): JSX.Element {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/update-password', { token, password });
     { //The token here is undefined
      // the token need to be sent 
      //to the post request with the 
      //new password to the server to allow the password to be changed 
      //the access token is found in the url after the ?:
      //to see how the token is sent go the the 
      //user controller and see the SendResetPasswordEmail function
     }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RestartPassword;
