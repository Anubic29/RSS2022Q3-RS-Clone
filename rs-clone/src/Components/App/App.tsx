import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { OverlayProvider } from '../../contexts';
import Overlay from '../Overlay/Overlay';

function App() {
  return (
    <>
      <OverlayProvider>
        <Header />
        <div className="App">
          <Outlet />
        </div>
        <Footer />
        <Overlay scope={'App'} />
      </OverlayProvider>
    </>
  );
}

export default App;
