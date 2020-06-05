// UI for slider components

import React from 'react';
import { View, Text, Slider } from 'react-native';

// params listed here just destructure what was passed in as {...rest}
// onChange is the slide function from AddEntry.js
export default function UdaciSlider({ max, unit, step, value, onChange}){
    return (
        <View>
            <Slider 
                value={value}
                step={step}
                minimumValue={0}
                maximumValue={max}
                onValueChange={onChange}
            />
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>

    )
}