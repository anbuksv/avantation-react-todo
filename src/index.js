import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToDo from './ToDo';

import Login from './Login'
import axios from "axios"


function handleRender() {
    if (localStorage.getItem("token")) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
        render("todo");
    } else {
        render("login");
    }
}


function reset() {
    localStorage.clear();
    handleRender();
}

function render(page) {
    if (page === "todo") {
        ReactDOM.render(<ToDo onResetClick={_ => {
            reset()
        }} />, document.getElementById('root'));
        return;
    }
    ReactDOM.render(<Login onLoginComplete={(token) => { handleRender() }} />, document.getElementById('root'));
}

handleRender();