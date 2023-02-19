import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from 'react';

interface PartOverlayContextInitialValue {
  isVisibleColumnList: boolean;
  setIsVisibleColumnList: Dispatch<SetStateAction<boolean>> | (() => void);
  childrenColumnList: React.ReactNode;
  setChildrenColumnList: Dispatch<SetStateAction<React.ReactNode>> | (() => void);
}

const partOverlayContextInitialValue: PartOverlayContextInitialValue = {
  isVisibleColumnList: false,
  setIsVisibleColumnList: () => undefined,
  childrenColumnList: null,
  setChildrenColumnList: () => undefined
};

export const PartOverlayContext = createContext(partOverlayContextInitialValue);

export const PartOverlayProvider = ({ children }: { children: ReactNode }) => {
  const [isVisibleColumnList, setIsVisibleColumnList] = useState(false);
  const [childrenColumnList, setChildrenColumnList] = useState<ReactNode>(null);

  const values = useMemo(
    () => ({
      isVisibleColumnList,
      setIsVisibleColumnList,
      childrenColumnList,
      setChildrenColumnList
    }),
    [isVisibleColumnList, setIsVisibleColumnList, childrenColumnList, setChildrenColumnList]
  );

  return <PartOverlayContext.Provider value={values}>{children}</PartOverlayContext.Provider>;
};

export const usePartOverlay = () => {
  return useContext(PartOverlayContext);
};
