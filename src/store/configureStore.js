import rootReducer from '../reducers';
import React from 'react';
import {createStore} from 'redux';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState
  );
}


