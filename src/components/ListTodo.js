import React, {useEffect, useState} from 'react';
import CreateTodo from "./CreateTodo";
import DetailTodo from "./DetailTodo";
import { BaseUrl }  from "../constants";
import axios from "axios";
import UpdateTodo from "./UpdateTodo";

function ListTodo(props) {
    const [todos, setTodos] = useState([])
    const [token, setToken] = useState("")
    const [Err, setErr] = useState("")


    useEffect(() => {
        setToken(localStorage.getItem("Token"));
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/todo/',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setTodos(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [todos, token]);

    function deleteTodo(todo_id) {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/todo/' + todo_id + '/',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function logout() {
        let data = '';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl+'/api/logout/',
            headers: {
                'Authorization': 'Token ' + token
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.removeItem("Token");
                window.location.href = "/login";
            })
            .catch((error) => {
                console.log(error);
                setErr(error.response.data);
            });
      }
    return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Your Todos</h1>
              {/* Logout Button */}
      <div className="flex justify-end mb-8">
      </div>
        {/* Button to create new Todo */}
      <div className="mt-8 flex justify-center">
        <CreateTodo />
        <button
          onClick={logout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
      {/* Container for notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {todos.map(todo => (
          <div key={todo.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="mb-4">
          <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${todo.completed ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}
          >
            {todo.completed ? 'Active' : 'Inactive'}
          </span>
              </div>
            {/* Todo detail */}
            <DetailTodo todo_id={todo.id} />
            {/* Todo detail */}
            <UpdateTodo todo_id={todo.id} />
            {/* Delete button */}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none transition duration-200"
            >
              Delete
            </button>
      </div>

        ))}
      </div>


    </div>
  );
}

export default ListTodo;