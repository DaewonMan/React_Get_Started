import { useState, useEffect } from 'react';
import styles from './App.module.css';
import * as Cpt from './components';

const Hello = () => {
  const ByeFn = () => {
    console.log("Destroy!!")
  };
  const HiFn = () => {
    console.log("Im Here!!")
    return ByeFn;
  };
  useEffect(HiFn, []);
  return <h1>Hello</h1>;
};

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState(0);
  const [showing, setShowing] = useState(false);
  const onClickForShow = () => setShowing((prev) => !prev);
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
      {showing ? <Hello /> : null}
      <Cpt.Button text={showing ? 'Hide' : 'Hello'} onClick={onClickForShow} />
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
