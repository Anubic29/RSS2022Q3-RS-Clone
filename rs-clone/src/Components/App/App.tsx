import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { OverlayContext } from '../../contexts';
import Overlay from '../Overlay/Overlay';
import { ReactNode, useState } from 'react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [children, setChildren] = useState<ReactNode>(null);

  return (
    <>
      <OverlayContext.Provider value={{ isVisible, setIsVisible, children, setChildren }}>
        <Header />
        <div className="App">
          <Outlet />
        </div>
        <Footer />
        {isVisible && <Overlay isVisible={isVisible}>{children}</Overlay>}
      </OverlayContext.Provider>
    </>
  );
}

export default App;
