import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/DoomsdayRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.doomsdayRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.doomsdaySuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.doomsdayFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
