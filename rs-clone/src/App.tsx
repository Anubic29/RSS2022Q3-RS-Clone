import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { OverlayProvider, PartOverlayProvider, useUser, useAlerts } from './contexts';
import Overlay from './components/Overlay/Overlay';

function App() {
  const { setUserDataBack } = useUser();
  const { alerts } = useAlerts();

  useEffect(() => {
    (async () => {
      setUserDataBack();
    })();
  }, []);

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

          {!!alerts.length && <div className="AlertsContainer">{alerts}</div>}
        </PartOverlayProvider>
      </OverlayProvider>
    </>
  );
}

export default App;
