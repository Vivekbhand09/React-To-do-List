import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

uuidv4();

export const TodoWrapper = ({ isDarkMode }) => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('default');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = todo => {
        setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
    };

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = id => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
    };

    const editTask = (task, id) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo)));
    };

    const toggleComplete = id => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
    });

    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (sort === 'name') return a.task.localeCompare(b.task);
        if (sort === 'status') return a.completed - b.completed;
        return 0;
    });

    return (
        <div className={`TodoWrapper ${isDarkMode ? 'dark' : 'light'}`}>
            <h1>TO-DO LIST</h1>
            <div className="controls">
                <label>
                    Filter:
                    <select value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                </label>
                <label>
                    Sort:
                    <select value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="name">Name</option>
                        <option value="status">Status</option>
                    </select>
                </label>
            </div>
            <TodoForm addTodo={addTodo} />
            {sortedTodos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={index} />
                ) : (
                    <Todo
                        task={todo}
                        key={index}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                )
            ))}
        </div>
    );
};
