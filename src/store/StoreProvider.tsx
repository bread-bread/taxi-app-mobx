import * as React from 'react';
import AppStore from './AppStore';
import { observer } from 'mobx-react';

const store = new AppStore();
const Context = React.createContext(store);

const StoreProvider: React.FC = ({ children }) => {
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
};

const useStore = (): AppStore => React.useContext(Context);

const withCoordinates = (WrappedComponent: React.ComponentType) => observer((props) => (
  <WrappedComponent
    getCoordinates={store.getCoordinates}
    resetCoords={store.resetCoordinates}
    coordinates={store.coordinates}
    {...props}
  />
));

export {
  Context,
  StoreProvider,
  useStore,
  withCoordinates
};
