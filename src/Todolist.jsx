  import React, { useState } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState([ { text: "Learn React", completed: false},
                                         { text: "Revise react", completed: false},
                                         { text: "Do react capstone", completed: false},
                                        ]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask !== "") {
             const newTask = { text: newTask.trim(), completed: false };
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
     
    const toggleComplete = (index) => {
        setTasks( 
            tasks.map((task, i) => i === index ? {...tasks, completed: !task.completed } : task)); 
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

                    <div className=" flex-col items-center p-3">
                     <input type="text" placeholder='Looking for a task?' className=' border border-gray-400 rounded-2xl flex-col items-center p-1'/>
                    </div>

                <ol className="space-y-3">
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm border border-gray-200 transform transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                        >
                            <div className="text-gray-800 font-medium flex-1">{task.text}</div>
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

                                <input type="checkbox" style={{backgroundColor: task.completed ? 'bl' : 'none' }}
                                        onClick={() => toggleComplete(index)}
                                />

                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default TodoList;