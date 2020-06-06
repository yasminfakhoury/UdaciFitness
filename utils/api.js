import { AsyncStorage } from 'react-native';
import { CALENDAR_STORAGE_KEY } from './_calendar';

// nwe entry for the day
export function submitEntry({ entry, key }){
    // merge data to the object stored at the specified key where the calendar data is stored
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry,
    }))
}

export function removeEntry(key){
    // 1. get the specific item out of AsyncStorage
    // 2. revert the data back into JSON format
    // 3. get rid of the data at the specified key
    // 4. pass the updated data in stringified form back to AsyncStorage
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
            .then(results => {
                const data = JSON.parse(results);
                data[key] = undefined;
                delete data[key];
                AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))

            })
}