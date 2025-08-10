  import React, { useState } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState(["Learn React", "Decide on react Capstone", "Do react Capstone"]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask !== "") {
            setTasks(tasks => [...tasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const currentTasks = tasks.filter((_, i) => i !== index);
        setTasks(currentTasks);
    }

    function editTask(index) {
        setEditIndex(index);
        setNewTask(tasks[index]);
    }

    function saveEdit() {
        if (newTask.trim() !== "") {
            const updated = [...tasks];
            updated[editIndex] = newTask.trim();
            setTasks(updated);
            setEditIndex(null);
            setNewTask("");
        }
    }

    return (
        <div className="min-h-screen bg-pink-100 flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 animate-fade-in">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700"> To-Do List</h1>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Enter a task..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                        value={newTask}
                        onChange={handleInputChange}
                    />
                    {editIndex !== null ? (
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
                            onClick={saveEdit}
                        >
                             Save
                        </button>
                    ) : (
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                            onClick={addTask}
                        >
                             Add
                        </button>
                    )}
                </div>

                <ol className="space-y-3">
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm border border-gray-200 transform transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                        >
                            <div className="text-gray-800 font-medium flex-1">{task}</div>
                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={() => editTask(index)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded-lg transition-all duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTask(index)}
                                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg transition-all duration-200"
                                >
                                     Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default TodoList;