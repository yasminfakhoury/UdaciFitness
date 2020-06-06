import * as React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry.js';
import { getMetricMetaInfo } from './utils/helpers.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      {/* 'flex:1' makes it so that child elements will expand full width of phone screen */}
      <View style={{flex:1}}>
        <AddEntry />
      </View>
    </Provider>
  );
}