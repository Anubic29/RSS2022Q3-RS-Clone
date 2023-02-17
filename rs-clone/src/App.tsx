import { Outlet } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { OverlayProvider } from './contexts';
import Overlay from './components/Overlay/Overlay';

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
