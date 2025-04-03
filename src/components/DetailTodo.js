import React, {useEffect, useState} from 'react';
import { BaseUrl } from "../constants";
import axios from "axios";

function DetailTodo(props) {
    const todo_id = props.todo_id
    const [todo, setTodo] = useState({})

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/todo/' + todo_id + '/',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setTodo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [todo]);

    return (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">{todo.title}</h1>
            <p className="text-lg text-gray-600">{todo.content}</p>
          </div>
    );
}

export default DetailTodo;