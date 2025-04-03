import React, {useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";

function CreateTodo(props) {
    // Created To Do function and integrated api
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [completed, setCompleted] = useState('false');
    const [user, setUser] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); // To handle modal visibility

    // Handle changes to form fields
    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleContentChange(e) {
        setContent(e.target.value);
    }

    function handleCompletedChange(e) {
        setCompleted(e.target.checked);
    }

    // Create the note and send data to the API
    function createNote() {
        let data = JSON.stringify({
            title,
            content,
            completed,
            user,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/todo/',
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setIsModalOpen(false); // Close modal on successful API call
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            {/* Navbar with a Button to Open the Modal */}
            <nav className="p-4">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-50"
                    >
                        Create Todo
                    </button>
                </div>
            </nav>

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create Todo</h2>

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
                                rows="5"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                                Status
                              </label>

                              {/* Toggle Switch */}
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
                                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${completed ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                  >
                                    <span
                                      className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 transform ${completed ? 'translate-x-6' : 'translate-x-0'}`}
                                    ></span>
                                  </span>
                                </label>

                                <span className="text-gray-600">Active</span>
                              </div>
                        </div>

                        {/* Create Todo Button */}
                        <button
                            onClick={createNote}
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Create Todo
                        </button>

                        {/* Close Modal Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-700 font-semibold text-xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateTodo;