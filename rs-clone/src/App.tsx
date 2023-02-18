import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { OverlayProvider } from './contexts';
import Overlay from './components/Overlay/Overlay';
import { useUser } from './contexts/User.context';

function App() {
  const { setUserDataBack } = useUser();

  useEffect(() => {
    (async () => {
      setUserDataBack();
    })();
  }, []);

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
