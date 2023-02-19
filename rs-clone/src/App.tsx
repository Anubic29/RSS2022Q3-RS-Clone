import { Outlet } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { OverlayProvider, PartOverlayProvider } from './contexts';
import Overlay from './components/Overlay/Overlay';

function App() {
  return (
    <>
      <OverlayProvider>
        <PartOverlayProvider>
          <Header />
          <div className="App">
            <Outlet />
          </div>
          <Footer />
          <Overlay scope={'App'} />
        </PartOverlayProvider>
      </OverlayProvider>
    </>
  );
}

export default App;
