import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import DateHeader from './DateHeader'

export default class AddEntry extends Component {

    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    // will increment metrics with steppers (run, bike, swim)
    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric);
        this.setState((currentState)=> {
            const count = currentState[metric] + step;
            return {
                ...currentState,
                [metric]: count > max ? max : count
            }
        })

    }

    decrement = (metric) => {
        this.setState((currentState)=> {
            const count = currentState[metric] - getMetricMetaInfo(metric).step;

            return {
                ...currentState,
                [metric]: count < 0 ? 0 : count
            }
        })

    }

    slide = (metric, newValue) => {
        this.setState=(()=>({
            [metric]: newValue
        }))
    }

    render(){

        const metaInfo = getMetricMetaInfo();
        
        return(
            <View>
                <DateHeader date={(new Date()).tolocaleDatestring}/>
                {/* returns an array of keys (each metric) */}
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key];
                    const value = this.state[key]; // the value in the state of that specific metric

                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                                ? <UdaciSlider 
                                    value={value}
                                    onChange={value => this.slide(key, value)}
                                     {...rest}
                                  />
                                : <UdaciSteppers 
                                    value= {value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                  />

                            }
                        </View>
                    )
                })}
            </View>
        )
    }
}