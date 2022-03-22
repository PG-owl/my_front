import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const element = (
  <div>
    <input type="text" /> + <input type="text" /> = <span>0</span>
  </div>
);
ReactDOM.render(element, document.getElementById('root'));