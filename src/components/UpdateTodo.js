import React, {useEffect, useState} from 'react';
import axios from "axios";
import { BaseUrl } from "../constants";

function UpdateTodo(props) {
  const todo_id = props.todo_id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = 1;

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BaseUrl}/api/todo/${todo_id}/`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setTitle(response.data.title);
        setContent(response.data.content);
        setCompleted(response.data.completed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [todo_id]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handleCompletedChange(e) {
    setCompleted(e.target.checked); // Toggle status between true/false
  }

  function updateTodo() {
    setLoading(true);
    setError('');
    setSuccess('');

    let data = JSON.stringify({
      title: title,
      content: content,
      completed: completed,
      user: user,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${BaseUrl}/api/todo/${todo_id}/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSuccess('Todo updated successfully!');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('Error updating todo. Please try again.');
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Update Todo</h2>

        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter title"
          />
        </div>

        {/* Content Field */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            placeholder="Enter content"
          ></textarea>
        </div>
          <div className="mb-6 flex items-center">
          <label htmlFor="status" className="block text-gray-700 font-medium mr-4">
            Status:
          </label>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Inactive</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="completed"
                checked={completed}
                onChange={handleCompletedChange}
                className="sr-only"
              />
              <span
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  completed ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 transform ${
                    completed ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </span>
            </label>
            <span className="text-gray-600">Active</span>
        </div>
      </div>

        {/* Error and Success Messages */}
        {error && (
          <p className="text-red-500 text-sm font-semibold text-center mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm font-semibold text-center mb-4">{success}</p>
        )}

        {/* Update Button */}
        <button
          onClick={updateTodo}
          disabled={loading}
          className={`w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Updating...' : 'Update Todo'}
        </button>
      </div>
    </div>
  );
}


export default UpdateTodo;