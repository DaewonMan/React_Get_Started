import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from './App.module.css';
import { Home, GridEx1 } from './pages';

import _ from 'lodash';

export const ApiContext = React.createContext();

function App() {
  const [isCallApi, setIsCallApi] = useState(false);
  
  return (
    <div>
      {isCallApi 
        && (
          <Box className={styles.progressBox}>
            <CircularProgress className={styles.progress} />
          </Box> 
        )}
      <ApiContext.Provider value={{ isCallApi, setIsCallApi }}>
        <Routes>
          <Route path="/*" element={<Home />}></Route>
          <Route path="/gridEx1" element={<GridEx1 />}></Route>
          {/* <Route path="/product/*" element={<Product />}></Route>
          <Route path="*" element={<NotFound />}></Route> */}
        </Routes>
      </ApiContext.Provider>
    </div>
  );
}

export default App;
