import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity>
            <Text onPress={onPress}>Submit</Text>
        </TouchableOpacity>
    )
}

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
        this.setState=((currentState)=>({
            ...currentState,
            [metric]: newValue
        }))
    }

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        // todo: update redux, navigate to home, save info to database, clear local notification

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }));
    }

    reset = () => {
        const key = timeToString();

        // todo: update redux, navigate to home, save info to database, 
    }

    render(){

        const metaInfo = getMetricMetaInfo();

        if(this.props.alreadyLogged){
            return (
                <View>
                    <Ionicons 
                        name='ios-happy'
                        size={100}
                    />
                    <Text>
                        You already logged your info for today.
                    </Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

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
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}