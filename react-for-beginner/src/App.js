import { useState, useEffect } from 'react';
import styles from './App.module.css';
import * as Cpt from './components';
import _ from 'lodash';

const Hello = () => {
  return (
    <h1>Hello</h1>
  );
};

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => {};
  
  return (
    <div>
      <Cpt.Button text={'test'} onClick={onClick} />
    </div>
  );
}

export default App;
