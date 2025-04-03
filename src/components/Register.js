import React, {useState} from 'react';
import Home from "./Home";
import {BaseUrl} from "../constants";
import axios from "axios";

function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function usernameChangeHandler(event) {
    setUsername(event.target.value);
  }

  function emailChangeHandler(event) {
    setEmail(event.target.value);
  }

  function passwordChangeHandler(event) {
    setPassword(event.target.value);
  }

  function register(event) {
    if (username === '' || email === '' || password === '') {
      setError('Please enter all fields');
    } else {
      let data = JSON.stringify({
        username: username,
        email: email,
        password: password,
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: BaseUrl + '/api/register/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setError('Registered successfully');
        })
        .catch((error) => {
          console.log(error);
          setError(error.response?.data || 'Something went wrong');
        });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h1>

        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={usernameChangeHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your username"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className={`text-center text-sm font-semibold mb-4 ${error.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {error}
          </p>
        )}

        {/* Register Button */}
        <button
          onClick={register}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;