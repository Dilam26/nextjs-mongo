"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function FormPage() {
  const router = useRouter();
  const params = useParams();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!params.taskId) {
      createTask();
    } else {
      // console.log("updating task");
      updateTask();
    }
  };

  const getTask = async () => {
    try {
      const response = await fetch(`/api/tasks/${params.taskId}`);
      const data = await response.json(); 
      setNewTask({
        title: data.title,
        description: data.description,
        isCompleted: data.isCompleted,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const createTask = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        router.push("/");
        // router.refresh();
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async () => {
    try {
      const response = await fetch(`/api/tasks/${params.taskId}`,{
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json();
      if (response.status === 200) {
        router.push("/");
        // router.refresh();
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`/api/tasks/${params.taskId}`, {
          method: "DELETE",
        });

        router.push("/");
        // router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {   
    if (params.taskId) { 
      getTask();
    }
  }, []);

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-between items-center">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-center mb-2">
            {params.taskId ? "Edit Task" : "Create a new task"}
          </h1>
          <button
            className="bg-red-500 text-white rounded-md p-2 mb-2"
            onClick={handleDelete}
            type="button"
          >
            Delete
          </button>
        </header>
        <input
          className="bg-gray-800 text-white rounded-md p-2 w-full"
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={newTask.title}
        />
        <textarea
          className="bg-gray-800 text-white rounded-md p-2 mt-2 w-full"
          rows="3"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={newTask.description}
        ></textarea>
        <button
          className="bg-blue-500 text-white rounded-md p-2 mt-2 w-full"
          type="submit"
        >
          {params.taskId ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default FormPage;
