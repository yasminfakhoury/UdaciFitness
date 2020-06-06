import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { white, purple } from '../utils/colors';

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}
        >
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends Component {

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

        // update redux with entry
        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }));

        // save info to AsyncStorage
        submitEntry({ key, entry });
    }

    reset = () => {
        const key = timeToString();

        // todo: update redux, navigate to home, save info to database, 

        // update redux
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))

        removeEntry({key});
    }

    render(){

        const metaInfo = getMetricMetaInfo();

        if(this.props.alreadyLogged){
            return (
                <View style={styles.center} >
                    <Ionicons 
                        name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
                        size={100}
                    />
                    <Text>
                        You already logged your info for today.
                    </Text>
                    <TextButton style={{padding: 10}} onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        return(
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()}/>

                {/* returns an array of keys (each metric) */}
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key];
                    const value = this.state[key]; // the value in the state of that specific metric

                    return (
                        <View key={key} style={styles.row}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30
    }
});

function mapStateToProps(state) {
    const key = timeToString();

    return {
        // if key for today exists, and the type .today (as seen in the getDaily ReminderValue() func) 
        // is undefined 

        // if the value at a specific state in our redux store has a 'today' property, that means we haven't
        // logged an entry for that day yet
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

// gives AddEntry component access to dispatch()
export default connect(mapStateToProps)(AddEntry);