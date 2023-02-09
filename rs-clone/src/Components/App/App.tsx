import { Outlet } from 'react-router-dom';
<<<<<<< HEAD

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
=======
import Header from '../header/Header';
import Footer from '../footer/Footer';

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Outlet />
      </div>
      <Footer />
    </>
>>>>>>> develop
  );
}

export default App;
