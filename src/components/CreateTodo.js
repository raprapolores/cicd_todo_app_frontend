import React, {useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";

function CreateTodo(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [completed, setCompleted] = useState(false);
    const [user, setUser] = useState(1);

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }

    function handleContentChange(e) {
        setContent(e.target.value)
    }
    function handleCompletedChange(e) {
        setCompleted(e.target.value)
    }

    function createNote() {

        let data = JSON.stringify({
            "title": title,
            "content": content,
            "completed": completed,
            "user": 1
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/todo/',
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
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create Note</h1>

          {/* Title Field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              onChange={handleTitleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Content Field */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
            <textarea
              id="content"
              onChange={handleContentChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="5"
            ></textarea>
          </div>

          {/* Status Field with Toggle */}
          <div className="mb-6 flex items-center">
            <label htmlFor="status" className="block text-gray-700 font-medium mr-4">Status:</label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Inactive</span>
              <button
                className="relative inline-flex items-center cursor-pointer rounded-full w-12 h-6 transition-colors duration-200 bg-indigo-600"
              >
                <span
                  className="w-5 h-5 rounded-full bg-white transition-transform duration-200 transform translate-x-0"
                ></span>
              </button>
              <span className="text-gray-600">Active</span>
            </div>
          </div>

          {/* Create Note Button */}
          <button
            onClick={createNote}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Note
          </button>
        </div>
    );
}

export default CreateTodo;