import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  random: null,
  guess: ['day'],
  set: ['date'],
  clearGuess: null
})

export const QuizTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  date: moment().format(),
  guess: null,
  result: null
})

/* ------------- Reducers ------------- */

export const random = (state) => {
  let date = randomDateBetween('1900-01-01', '2099-12-31');
  return state.merge({
    date: date.format()
  });
}

export const set = (state, { date }) =>
  state.merge({ date: moment(date).format() })

export const guess = (state, { day }) =>
  state.merge({ guess: day, result: day === moment(state.date).day() })

export const clearGuess = (state) =>
  state.merge({ guess: null, result: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RANDOM]: random,
  [Types.SET]: set,
  [Types.GUESS]: guess,
  [Types.CLEAR_GUESS]: clearGuess
})

/* ------------- Utilities ------------- */

function randomDateBetween(from, to) {
  let mFrom = moment(from);
  let mTo = moment(to);
  return moment(mFrom.valueOf() + Math.random() * (mTo.valueOf() - mFrom.valueOf()));
}

