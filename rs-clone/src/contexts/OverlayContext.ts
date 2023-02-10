import { createContext, Dispatch, SetStateAction } from 'react';

interface OverlayContextInitialValue {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>> | (() => void);
  children: React.ReactNode;
  setChildren: Dispatch<SetStateAction<React.ReactNode>> | (() => void);
}

const overlayContextInitialValue: OverlayContextInitialValue = {
  isVisible: false,
  setIsVisible: () => undefined,
  children: null,
  setChildren: () => undefined
};

const OverlayContext = createContext(overlayContextInitialValue);

export default OverlayContext;
