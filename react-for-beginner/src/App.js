import styles from './App.module.css';
import Button from './Button';

function App() {
  return (
    <div>
      <h1 className={styles.title}>test</h1>
      <Button text={'test'}/>
    </div>
  );
}

export default App;
