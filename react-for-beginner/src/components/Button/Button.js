import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';
import _ from 'lodash';

const Button = ({ text, onClick }) => {
  // console.log('Render Button')
  const [arr, setArr] = useState([
    {cd: 't1', nm: '바나나'},
    {cd: 't2', nm: '딸기'},
    {cd: 't3', nm: '멜론'},
    {cd: 't4', nm: '수박'},
  ]);

  return (
    <>
      <button
        className={styles.btn}
        onClick={onClick}
      >
        {text}
      </button>
      {
        _.map(arr, (x, idx) => {
          return (
            <div key={x.cd}>
              <p>{x.nm}</p>
            </div>
          );
        })
      }
    </>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default memo(Button);