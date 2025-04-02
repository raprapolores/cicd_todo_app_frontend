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
        <div>
            <h2>{todo.title}</h2>
            <p>{todo.content}</p>
        </div>
    );
}

export default DetailTodo;