import * as React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';
import { getMetricMetaInfo } from './utils/helpers';

export default function App() {
  return (
    <View>
      {getMetricMetaInfo('bike').getIcon()}
    </View>
  );
}