import { namespace, deepmerge, apiUrl } from './util'
import * as request from '../request-util'

function namespacedConstant (value) {
  return namespace('GAME', value)
}

// ------------------------------------
// Constants
// ------------------------------------
const gamesUrl = `${apiUrl}/games`

const LOAD_REQUEST = namespacedConstant('LOAD_REQUEST')
const LOAD_SUCCESS = namespacedConstant('LOAD_SUCCESS')
const JOIN_REQUEST = namespacedConstant('JOIN_REQUEST')
const JOIN_SUCCESS = namespacedConstant('JOIN_SUCCESS')
const LEAVE_REQUEST = namespacedConstant('LEAVE_REQUEST')
const LEAVE_SUCCESS = namespacedConstant('LEAVE_SUCCESS')
const DRAW_CARD_SUCCESS = namespacedConstant('DRAW_CARD_SUCCESS')
const DISCARD_CARD_SUCCESS = namespacedConstant('DISCARD_CARD_SUCCESS')
const GIVE_CARD_TO_OTHER_MEMBER_SUCCESS = namespacedConstant('GIVE_CARD_TO_OTHER_MEMBER_SUCCESS')
const ERROR = namespacedConstant('ERROR')

// ------------------------------------
// Action Creators
// ------------------------------------
function getGame (id) {
  return {
    types: [LOAD_REQUEST, LOAD_SUCCESS, ERROR],
    id,
    promise: () => request.get(`${gamesUrl}/${id}`)
  }
}

function join (username) {
  return {
    types: [JOIN_REQUEST, JOIN_SUCCESS, ERROR],
    username,
    promise: (dispatch, getState) => {
      const id = getState().currentGame.game.id
      return request.post(`${gamesUrl}/${id}/join`, { username })
    }
  }
}

function leave (username) {
  return {
    types: [LEAVE_REQUEST, LEAVE_SUCCESS, ERROR],
    username,
    promise: (dispatch, getState) => {
      const id = getState().currentGame.game.id
      return request.post(`${gamesUrl}/${id}/leave`, { username })
    }
  }
}

function drawCard (card) {
  // TODO
}

function discardCard (card) {
  // TODO
}

function placeCard (card) {
  // TODO
}

function giveCardToOtherMember (card, username) {
  // TODO
}

const error = (err) => ({ type: ERROR, error: err })

export const actions = {
  getGame,
  join
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  game: null,
  membership: {},
  isWorking: false,
  error: null
}

const requestActionHandler = (state) => ({ ...state, isWorking: true, error: null })

const actionHandlers = {
  [LOAD_REQUEST]: requestActionHandler,

  [LOAD_SUCCESS]: (state, { payload }) => {
    const nextState = deepmerge(state, { game: payload.game, isWorking: false, error: null })

    return nextState
  },

  [JOIN_REQUEST]: requestActionHandler,

  [JOIN_SUCCESS]: (state, { payload }) => {
    const newMember = payload.newMember

    const nextState = deepmerge(state, { isWorking: false, error: null })

    const alreadyJoined = nextState.game.members.filter(member => member.id === newMember.id).length

    if (!alreadyJoined) {
      nextState.game.members.push(newMember)
    }

    nextState.membership[nextState.game.id] = newMember

    return nextState
  },

  [ERROR]: (state, { error }) => ({ ...state, isWorking: false, error })
}

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
