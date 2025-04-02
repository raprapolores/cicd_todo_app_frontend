import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (localStorage.getItem("Token")) {
            window.location.href = "/logout";
        }
    }, []);
    function usernameHandler(event) {
        setUsername(event.target.value)
    }
    function passwordHandler(event) {
        setPassword(event.target.value)
    }

    function login() {
        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/login/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("Token", response.data.token);
                setMessage("Logged in successfully");
                window.location.href = "/todoList";
            })
            .catch((error) => {
                console.log(error);
                setMessage(error.response.data);
            });
    }
    return (

            <div className="flex justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h1>

                {/* Username Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={usernameHandler}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={passwordHandler}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Login Button */}
                <button
                    onClick={login}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button>

                {/* Message */}
                {message && (
                    <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;