import React, {useEffect, useState} from 'react';
import axios from "axios";
import { BaseUrl } from "../constants";

function UpdateTodo(props) {
    const todo_id = props.todo_id
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [completed, setCompleted] = useState(false);
    const user = 1;

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
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleContentChange(e) {
        setContent(e.target.value);
    }

    function updateTodo() {
        let data = JSON.stringify({
            "title": title,
            "content": content,
            "user": user
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/todo/' + todo_id + '/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <p>Title: <input type="text" onChange={handleTitleChange} value={title} /></p>
            <p>Content: <textarea onChange={handleContentChange} value={content}></textarea></p>
            <button onClick={updateTodo}>Update</button>
        </div>
    );
}

export default UpdateTodo;