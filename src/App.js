import './App.css';
import React, { useState, useEffect } from 'react';
import { TodoWrapper } from './components/TodoWrapper';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedMode = localStorage.getItem('mode');
        return storedMode ? JSON.parse(storedMode) : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        localStorage.setItem('mode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
            <button className="mode-toggle" onClick={toggleMode}>
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <TodoWrapper isDarkMode={isDarkMode} />
        </div>
    );
}

export default App;
