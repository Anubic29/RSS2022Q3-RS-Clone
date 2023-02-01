import React from 'react';
import api from './api';

import './App.scss';

async function asReq() {
  const response = await api.records.getData('users');
  const data = response.data;
  console.log(data);
}

function App() {
  asReq();
  return (
    <div className="App">
      <h1 className="title">RS Clone</h1>
    </div>
  );
}

export default App;
