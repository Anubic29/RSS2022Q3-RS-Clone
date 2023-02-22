import React, { createContext, useContext, useState } from 'react';
import { v4 as generateId } from 'uuid';
import { Alert } from '../components';

interface AlertsContextValue {
  alerts: JSX.Element[];
  addAlert: (
    type: AlertType,
    message: string,
    isFinite?: boolean,
    children?: React.ReactNode
  ) => void;
  removeAlert: (id: string) => void;
  removeAllAlerts: () => void;
}

interface AlertsProviderProps {
  children: React.ReactNode;
}

type AlertType = 'Warning' | 'Success' | 'Error' | 'Info';

const AlertsContext = createContext<AlertsContextValue | null>(null);

const DELAY_TO_REMOVE_IN_MS = 10000;

function AlertsProvider(props: AlertsProviderProps) {
  const { children } = props;
  const [alerts, setAlerts] = useState<JSX.Element[]>([]);

  const addAlert = (
    type: AlertType,
    message: string,
    isFinite = false,
    children?: React.ReactNode
  ) => {
    const id = generateId();

    setAlerts((alerts) => [
      ...alerts,
      <Alert type={type} message={message} key={id} id={id} isFinite={isFinite}>
        {children}
      </Alert>
    ]);

    setTimeout(() => {
      setAlerts((alerts) => alerts.filter((alert) => alert.key !== id || alert.props.isFinite));
    }, DELAY_TO_REMOVE_IN_MS);
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.key !== id));
  };

  const removeAllAlerts = () => {
    setAlerts([]);
  };

  const contextValue = {
    alerts,
    addAlert,
    removeAlert,
    removeAllAlerts
  };

  return <AlertsContext.Provider value={contextValue}>{children}</AlertsContext.Provider>;
}

const useAlerts = () => useContext(AlertsContext) as AlertsContextValue;

export { AlertsProvider, useAlerts };
