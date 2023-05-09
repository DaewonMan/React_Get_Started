import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from './App.module.css';
import { Home, GridEx1 } from './pages';

import { AlertDialog } from 'components';

import _ from 'lodash';

export const ApiContext = React.createContext();

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  
  const onSubmit = (e) => {
    e.preventDefault();
    if(toDo === "") {
      return;
    }
    setToDos(currentArray => [toDo, ...currentArray]);
    setToDo("");
  };
console.log(toDos)
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input 
          value={toDo}
          onChange={e => setToDo(e.target.value)}
          type="text"
          placeholder="input...."
        />
        <button>Add To Do</button>
        <hr />
        {toDos.map((x, idx) => 
          <li key={idx}>{x.toUpperCase()}</li>)}
      </form>
    </div>
  );
}

export default App;
