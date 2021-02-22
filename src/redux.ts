import {applyMiddleware, createStore, Dispatch} from 'redux';

import {routerMiddleware} from "connected-react-router";
import {composeWithDevTools} from "redux-devtools-extension";

import thunk from 'redux-thunk';
import {fetchData} from "./utils/AuxFns";

// types
export enum Actions {
    TEXTS_LOADED = "TEXTS_LOADED",
    ERROR_RECEIVED = "ERROR_RECEIVED",
    TEXT_FOR_RACE_SELECTED = "TEXT_FOR_RACE_SELECTED",
    TEXT_FOR_RACE_DESELECTED = "TEXT_FOR_RACE_DESELECTED",
    SET_LOADING_STATUS = "SET_LOADING_STATUS",
    RESULTS_LOADED = "RESULTS_LOADED",
    RESULT_SELECTED = "RESULT_SELECTED",
    RESULT_DESELECTED = "RESULT_DESELECTED"
}

export interface TextData {
    author: string
    created: number
    updated: number
    id: string
    text: string
    name: string
    text_analysis: {
        length: number
        sentences_amount: number
        words_amount: number
        alphabet: number
        syllables: number
        complexity: number
    }
}

export interface globalState {
    texts: TextData[]
    loading: boolean
    selectedText: TextData | null
    results: raceResults[]
    selectedResult: raceResults | null
}

export const initialState: globalState = {
    texts: [],
    loading: false,
    selectedText: null,
    results: [],
    selectedResult: null
}

export interface authParams {
    login: string
    password: string
}

export interface FinalStats {
    text_id: string,
    start: string,
    end: string,
    wpmStats: { [time: string]: number }[],
    errorsStats: { [word: string]: number[] }[]
}

export interface raceResults {
    id: string,
    text_id: string,
    time: number,
    wpm: {
        max: number,
        min: number,
        average: number,
        median: number,
        story: { time: number, wpm: number }[]
    },
    errors: {
        word: string, errors: number[]
    }[]
}

export interface userResults extends raceResults {
    user: string
}

// actions
export const textsLoaded = (texts: TextData[]) => ({
    type: Actions.TEXTS_LOADED,
    payload: texts
});

export const resultsLoaded = (results: raceResults[]) => ({
    type: Actions.RESULTS_LOADED,
    payload: results
});

export const errorReceived = (error: Error) => ({
    type: Actions.ERROR_RECEIVED,
    payload: error
})

export const getTexts = () => async (dispatch: Dispatch) => {
    try {
        setLoadingStatus(true)
        const responseBody = await fetchData("GET", "texts")
        dispatch(textsLoaded(responseBody));
    } catch (error) {
        console.error(error);
        dispatch(errorReceived(error));
    } finally {
        setLoadingStatus(false)
    }
}

export const getResults = () => async (dispatch: Dispatch) => {
    try {
        setLoadingStatus(true)
        const responseBody = await fetchData("GET", "my_results")
        dispatch(resultsLoaded(responseBody));
    } catch (error) {
        console.error(error);
        dispatch(errorReceived(error));
    } finally {
        setLoadingStatus(false)
    }
}

export const setLoadingStatus = (status: boolean) => {
    return function (dispatch: Dispatch) {
        dispatch({type: Actions.SET_LOADING_STATUS, payload: status});
    };
}

// reducers
export const textsReducer = (state: globalState = initialState, action: any) => {
    switch (action.type) {
        case Actions.TEXTS_LOADED:
            return {
                ...state,
                texts: action.payload
            };
        case Actions.ERROR_RECEIVED:
            return {
                ...state,
                error: action.payload
            };
        case Actions.TEXT_FOR_RACE_SELECTED:
            return {
                ...state,
                selectedText: action.payload
            }
        case Actions.TEXT_FOR_RACE_DESELECTED:
            return {
                ...state,
                selectedText: null
            }
        case Actions.SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.payload
            }
        case Actions.RESULTS_LOADED:
            return {
                ...state,
                results: action.payload
            }
        case Actions.RESULT_SELECTED:
            return {
                ...state,
                selectedResult: action.payload
            }
        case Actions.RESULT_DESELECTED:
            return {
                ...state,
                selectedResult: null
            }
        default:
            return state;
    }
};

// store

export const history = require("history").createBrowserHistory;

const middleware = [thunk, routerMiddleware(history)];

export const store = createStore(textsReducer, composeWithDevTools(applyMiddleware(...middleware)));
