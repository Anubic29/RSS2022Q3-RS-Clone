import { Outlet } from 'react-router-dom';
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
  );
}

export default App;
