import { useEffect } from "react";
import taskService from "./services/tasks";
import { useState } from "react";
import Tasks from "./components/Tasks";
import TaskForm from "./components/TaskForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "",
    done: false,
    date: "",
  });
  const [message, setMessage] = useState(null);
  const [newFilter, setNewFilter] = useState("");

  const filteredTask = tasks.filter((t) =>
    t.title.toLowerCase().includes(newFilter.toLowerCase()),
  );

  const listToShow = newFilter === "" ? tasks : filteredTask;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    taskService.getAll().then((initialTasks) => {
      setTasks(initialTasks);
    });
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setNewTask({
      ...newTask,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();

    taskService
      .create(newTask)
      .then((returnTask) => {
        setTasks(tasks.concat(returnTask));
        setNewTask({
          title: "",
          priority: "",
          done: false,
          date: "",
        });
        setMessage({
          text: `Added ${newTask.title}`,
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setMessage({
          text: error.response.data.error,
          type: "error",
        });
      });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const updateDone = (id) => {
    const task = tasks.find((t) => t.id === id);
    const changedTask = { ...task, done: !task.done };

    taskService
      .update(id, changedTask)
      .then((returnedTask) => {
        setTasks(tasks.map((task) => (task.id !== id ? task : returnedTask)));
      })
      .catch(() => {
        setMessage({
          text: `Task '${task.title}' was already removed from the server`,
          type: "error",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setTasks(tasks.filter((t) => t.id !== id));
      });
  };

  const deleteData = (id) => {
    if (!window.confirm("Do you want to delete this task?")) return;

    taskService.deleteTask(id).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
    setMessage({
      text: `Deleted successfully`,
      type: "success",
    }).catch(() => {
      setMessage({
        text: `Task was already removed from the server`,
        type: "error",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  return (
    <>
      <h1>Task manager app</h1>
      <Notification message={message} />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add new tasks</h2>
      <TaskForm
        addTask={addTask}
        newTask={newTask}
        handleChange={handleChange}
      />
      <h2>List of tasks</h2>
      <Tasks
        tasks={tasks}
        onUpdate={updateDone}
        onDelete={deleteData}
        listToShow={listToShow}
        formatDate={formatDate}
      />
    </>
  );
};

export default App;
