import styles from './App.module.css';
import * as Cpt from './components';

function App() {
  return (
    <div>
      <h1 className={styles.title}>test</h1>
      <Cpt.Button text={'test'}/>
    </div>
  );
}

export default App;
