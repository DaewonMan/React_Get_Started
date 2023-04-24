import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from './App.module.css';
import { Home } from './pages';

import _ from 'lodash';

export const ApiContext = React.createContext();

function App() {
  const [isCallApi, setIsCallApi] = useState(false);
  
  return (
    <div>
      {isCallApi 
        ? (
          <Box className={styles.progressBox}>
            <CircularProgress className={styles.progress} />
          </Box> 
        )
        : null}
      <ApiContext.Provider value={{ isCallApi, setIsCallApi }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            {/* <Route path="/product/*" element={<Product />}></Route>
            <Route path="*" element={<NotFound />}></Route> */}
          </Routes>
        </BrowserRouter>
      </ApiContext.Provider>
    </div>
  );
}

export default App;
