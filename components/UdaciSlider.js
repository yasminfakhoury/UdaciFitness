// UI for slider components

import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import { gray } from '../utils/colors';

// params listed here just destructure what was passed in as {...rest}
// onChange is the slide function from AddEntry.js
export default function UdaciSlider({ max, unit, step, value, onChange}){
    return (
        <View style={styles.row}>
            <Slider 
                style={{flex:1}}
                value={value}
                step={step}
                minimumValue={0}
                maximumValue={max}
                onValueChange={onChange}
            />
            <View style={styles.metricCounter}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color: gray, textAlign:'center'}}>{unit}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    metricCounter: {
        width: 85,
        justifyContent: 'center'
    }
})