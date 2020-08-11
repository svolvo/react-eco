import { 
    createStore, 
    combineReducers, 
    applyMiddleware, // thunk
} from 'redux';
// persist store between browser sessions
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// thunk
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { todos } from './todos/reducers';

const reducers = {
    todos,
};

// configure persistance
const persistConfig = {
    key: 'root', 
    storage,
    stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => 
    createStore(
        persistedReducer,
        // add thunk
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );