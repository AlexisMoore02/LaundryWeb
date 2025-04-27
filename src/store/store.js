import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './allReducers';

// Конфигурация persistor
const persistConfig = {
  key: 'root',
  storage,
};

// Создание persistReducer с конфигурацией
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Подключение Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Создание store с middleware и persistor
const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export const persistor = persistStore(store);
export default store;
