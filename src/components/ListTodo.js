import React, {useEffect, useState} from 'react';
import CreateTodo from "./CreateTodo";
import DetailTodo from "./DetailTodo";
import { BaseUrl }  from "../constants";
import axios from "axios";
import UpdateTodo from "./UpdateTodo";

function ListTodo(props) {
    const [todos, setTodos] = useState([])
    useEffect(() => {
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
    }, [todos]);

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

    return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Your Todos</h1>

      {/* Container for notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {todos.map(todo => (
          <div key={todo.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {/* Note detail */}
            <DetailTodo todo_id={todo.id} />
            <UpdateTodo todo_id={todo.id}/>
            {/* Delete button */}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none transition duration-200"
            >
              Delete
            </button>
              <button
              onClick={() => deleteTodo(todo.id)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none transition duration-200"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Button to create new Todo */}
      <div className="mt-8 flex justify-center">
        <CreateTodo />
      </div>
    </div>
  );
}

export default ListTodo;