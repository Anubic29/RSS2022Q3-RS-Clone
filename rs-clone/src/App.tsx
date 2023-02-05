import { Outlet } from 'react-router-dom';
import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';

import './App.scss';

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
