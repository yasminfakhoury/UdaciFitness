import * as React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import AddEntry from './components/AddEntry.js';
import { getMetricMetaInfo } from './utils/helpers.js';

export default function App() {
  return (
    <View style = {style.container}>
      <AddEntry />
    </View>
  );
}