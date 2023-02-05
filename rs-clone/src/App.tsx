import { Outlet } from 'react-router-dom';
import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
