import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function RestartPassword(): JSX.Element {
  const location = useLocation();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const tokenFromURL = location.search.slice(2);
    setToken(tokenFromURL);
  }, [location]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    const updatePassword = async () => {
      try {
        const response = await axios.patch('http://localhost:4000/api/v1/update-password', { token, password });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error; 
      }
    };
  
    toast.promise(
      updatePassword(),
      {
        loading: 'Updating password...',
        success: (data) => `Password updated successfully! `,
        error: (err) => `Error: ${err.response?.data || 'Unknown error'}`, 
      },
      {
        style: {
          minWidth: '250px',
        },
      },
    );
  };
  return (
    <div>
      <Toaster position='top-center' reverseOrder={true} />
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
