import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from 'react';

interface OverlayContextInitialValue {
  isVisibleApp: boolean;
  setIsVisibleApp: Dispatch<SetStateAction<boolean>> | (() => void);
  childrenApp: React.ReactNode;
  setChildrenApp: Dispatch<SetStateAction<React.ReactNode>> | (() => void);
  isVisibleBoard: boolean;
  setIsVisibleBoard: Dispatch<SetStateAction<boolean>> | (() => void);
  childrenBoard: React.ReactNode;
  setChildrenBoard: Dispatch<SetStateAction<React.ReactNode>> | (() => void);
}

const overlayContextInitialValue: OverlayContextInitialValue = {
  isVisibleApp: false,
  setIsVisibleApp: () => undefined,
  childrenApp: null,
  setChildrenApp: () => undefined,
  isVisibleBoard: false,
  setIsVisibleBoard: () => undefined,
  childrenBoard: null,
  setChildrenBoard: () => undefined
};

export const OverlayContext = createContext(overlayContextInitialValue);

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [isVisibleApp, setIsVisibleApp] = useState(false);
  const [childrenApp, setChildrenApp] = useState<ReactNode>(null);
  const [isVisibleBoard, setIsVisibleBoard] = useState(false);
  const [childrenBoard, setChildrenBoard] = useState<ReactNode>(null);

  const values = useMemo(
    () => ({
      isVisibleApp,
      setIsVisibleApp,
      childrenApp,
      setChildrenApp,
      isVisibleBoard,
      setIsVisibleBoard,
      childrenBoard,
      setChildrenBoard
    }),
    [
      isVisibleApp,
      setIsVisibleApp,
      childrenApp,
      setChildrenApp,
      isVisibleBoard,
      setIsVisibleBoard,
      childrenBoard,
      setChildrenBoard
    ]
  );

  return <OverlayContext.Provider value={values}>{children}</OverlayContext.Provider>;
};

export const useOverlay = () => {
  return useContext(OverlayContext);
};
