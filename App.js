import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {colors} from './src/constants/theme';
import MainApp from './src/navigation';
import {persistor, store} from './src/store/index';
// LogBox.ignoreAllLogs(true)
const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={colors.dark_primary_color}
        barStyle={'light-content'}
      />
      <PersistGate loading={null} persistor={persistor}>
        <MenuProvider>
          <MainApp />
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
