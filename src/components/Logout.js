import React, {useEffect, useState} from 'react';
import {BaseUrl} from "../constants";
import axios from "axios";

function Logout(props) {
    const [token, setToken] = useState("")
    const [message, setMessage] = useState("")
    useEffect(() => {
        setToken(localStorage.getItem("Token"));
    }, []);

    function logout() {

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: BaseUrl + '/api/logout/',
          headers: {
            'Authorization': 'Token ' + token
          }
        };

        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          localStorage.removeItem("Token");
          window.location.href = "/login";

        })
        .catch((error) => {
          console.log(error);
          setMessage(error.response.data);
        });
    }
    return (
        <div>
            <h1>Logout</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Logout;