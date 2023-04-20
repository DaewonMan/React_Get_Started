import { useState, useEffect } from 'react';
import styles from './App.module.css';
import * as Cpt from './components';

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState(0);
  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (e) => setKeyword(e.target.value);
  
  console.log('Render App');
  
  const iRunOnlyOnce = () => {
    console.log('I Run Only ', counter);
  };
  
  useEffect(iRunOnlyOnce, [counter]);
  
  useEffect(() => {
    console.log('CALL THE API...');
  }, []);

  useEffect(() => {
    if(keyword == '' || keyword == null || keyword.length < 5) return;

    console.log('Search For', keyword);
  }, [keyword]);

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search here..."
        value={keyword}
        onChange={onChange}
      >
      </input>
      <h1 className={styles.title}>{keyword}</h1>
      <h1 className={styles.title}>{counter}</h1>
      <Cpt.Button text={'test'} onClick={onClick} />
    </div>
  );
}

export default App;
