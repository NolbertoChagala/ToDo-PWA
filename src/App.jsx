import { useState, useEffect } from "react";
import "./App.css";
import withSplashScreen from "./components/splashComponents";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }

    if (Notification.permission === "granted") {
      new Notification("Tarea agregada", {
        body: `La tarea "${task}" ha sido agregada a tu lista.`,
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Tarea agregada", {
            body: `La tarea "${task}" ha sido agregada a tu lista.`,
          });
        }
      });
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <div className="px-4 py-2">
          <h1 className="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
        </div>
        <form className="w-full max-w-sm mx-auto px-4 py-2">
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Nueva Tarea"
            />

            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={addTask}
            >
              Agregar
            </button>
          </div>
        </form>

        <ul className="divide-y divide-gray-200 px-4">
          {/* Aquí van las tareas */}
          {tasks.map((t, i) => (
            <li key={i} className="py-4 flex justify-between items-center">
              <span className="text-gray-700">{t}</span>
              <button
                className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                onClick={() => deleteTask(i)}
              >
                Eliminar
              </button>
            </li>
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 py-4">No hay tareas</p>
          )}
        </ul>
      </div>

      <footer className="bg-gray-100 py-8 text-center fixed bottom-0 left-0 w-full">
        <a
          href="#"
          className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900"
        >
          <img
            src="https://www.svgrepo.com/show/499962/music.svg"
            className="h-12 mr-3 sm:h-9"
            alt="Landwind Logo"
          />
          Landwind
        </a>

        <span className="block text-sm text-gray-500">
          © 2021-2022 <b>Landwind™</b>. All Rights Reserved. Built with{" "}
          <a
            href="https://flowbite.com"
            className="text-purple-600 hover:underline"
          >
            Flowbite
          </a>{" "}
          and{" "}
          <a
            href="https://tailwindcss.com"
            className="text-purple-600 hover:underline"
          >
            Tailwind CSS
          </a>
          .
        </span>

        <ul className="flex justify-center mt-5 space-x-5">
          <li>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.494v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.588l-.467 3.622h-3.121V24h6.116C23.403 24 24 23.403 24 22.676V1.325C24 .597 23.403 0 22.675 0z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900"
              aria-label="GitHub"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 0C5.372 0 0 5.372 0 12a12.01 12.01 0 008.207 11.385c.6.111.82-.261.82-.58v-2.03c-3.338.726-4.043-1.416-4.043-1.416-.546-1.386-1.334-1.755-1.334-1.755-1.09-.746.082-.73.082-.73 1.205.085 1.839 1.238 1.839 1.238 1.07 1.835 2.809 1.305 3.494.998.108-.775.419-1.305.763-1.605-2.665-.304-5.467-1.333-5.467-5.932 0-1.311.469-2.382 1.237-3.223-.124-.303-.537-1.524.117-3.176 0 0 1.01-.324 3.3 1.23a11.5 11.5 0 013.004-.404 11.5 11.5 0 013.004.404c2.289-1.554 3.298-1.23 3.298-1.23.655 1.652.242 2.873.118 3.176.77.841 1.236 1.912 1.236 3.223 0 4.61-2.805 5.625-5.476 5.921.43.372.814 1.103.814 2.222v3.293c0 .322.218.695.825.577A12.01 12.01 0 0024 12c0-6.628-5.372-12-12-12z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M24 4.556a9.84 9.84 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.868 9.868 0 01-3.127 1.195A4.918 4.918 0 0016.616 3a4.922 4.922 0 00-4.918 4.918c0 .385.045.76.127 1.122C7.728 8.845 4.1 6.884 1.671 3.903a4.904 4.904 0 00-.666 2.475c0 1.708.87 3.214 2.191 4.096a4.904 4.904 0 01-2.228-.616v.06a4.924 4.924 0 003.946 4.827 4.996 4.996 0 01-2.224.085 4.93 4.93 0 004.6 3.42A9.867 9.867 0 010 21.542 13.9 13.9 0 007.548 24c9.142 0 14.307-7.721 13.995-14.646A10.02 10.02 0 0024 4.556z" />
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}


const AppWithSplash = withSplashScreen(App);
AppWithSplash.displayName = 'AppWithSplash';
export default AppWithSplash;

