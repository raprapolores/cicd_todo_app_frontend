import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ListTodo from "./components/ListTodo";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  return (
      <BrowserRouter>
          <div className="min-h-screen bg-gray-100 flex flex-col">
              <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                  <h1 className="text-2xl font-bold">My App</h1>
                </div>
              </header>

              <main className="flex-1 container mx-auto p-6">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/todoList" element={<ListTodo />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </main>

              <footer className="bg-blue-600 text-white p-4 mt-6">
                <div className="container mx-auto text-center">
                  <p>&copy; 2025 My App. All rights reserved.</p>
                </div>
              </footer>
            </div>
      </BrowserRouter>
  );
}

export default App;
