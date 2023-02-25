import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { OverlayProvider, PartOverlayProvider, useUser, useAlerts } from './contexts';
import { Overlay } from './components';

function App() {
  const { setUserDataBack } = useUser();
  const { alerts, addAlert } = useAlerts();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const answer = await setUserDataBack();
        if (answer === 403 || answer === 401) {
          addAlert('Error', 'Token is broken');
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
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
