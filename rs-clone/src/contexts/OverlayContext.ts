import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface OverlayContextInitialValue {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>> | (() => void);
  children: React.ReactNode;
  setChildren: Dispatch<SetStateAction<React.ReactNode>> | (() => void);
}

const overlayContextInitialValue: OverlayContextInitialValue = {
  isVisible: true,
  setIsVisible: () => undefined,
  children: null,
  setChildren: () => undefined
};

const OverlayContext = createContext(overlayContextInitialValue);

export default OverlayContext;

export const useOverlay = () => {
  return useContext(OverlayContext);
};
