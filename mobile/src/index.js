import React, { Fragment } from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './routes';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

const App = () => (
  <Fragment>
    <StatusBar
      barStyle="dark-content"
      backgroundColor="transparent"
      translucent
    />
    <Routes />
  </Fragment>

);

export default App;
