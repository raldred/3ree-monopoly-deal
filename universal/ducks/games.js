import { namespace, deepmerge, apiUrl } from './util'
import * as request from '../request-util'

function namespacedConstant (value) {
  return namespace('GAMES', value)
}

// ------------------------------------
// Constants
// ------------------------------------
const gamesUrl = `${apiUrl}/games`

const LOAD_PAGE_REQUEST = namespacedConstant('LOAD_PAGE_REQUEST')
const LOAD_SUCCESS = namespacedConstant('LOAD_SUCCESS')
const ADD_REQUEST = namespacedConstant('ADD_REQUEST')
const ADD_SUCCESS = namespacedConstant('ADD_SUCCESS')
const DELETE_REQUEST = namespacedConstant('DELETE_REQUEST')
const DELETE_SUCCESS = namespacedConstant('DELETE_SUCCESS')
const UPDATE_REQUEST = namespacedConstant('UPDATE_REQUEST')
const UPDATE_SUCCESS = namespacedConstant('UPDATE_SUCCESS')
const ERROR = namespacedConstant('ERROR')

// ------------------------------------
// Action Creators
// ------------------------------------
function getGames (page = 0) {
  return (dispatch) => {
    dispatch(loadPageRequest(page))

    return request
      .get(gamesUrl, { page })
      .end((err, res) => {
        dispatch(err ? error(err) : loadSuccess(res.body))
      })
  }
}

function addGame (game) {
  return (dispatch, getState) => {
    dispatch(addRequest(game))

    return request
      .post(gamesUrl, game)
      .end((err, res) => {
        if (err) {
          dispatch(error(err))
        } else {
          // relying on the real-time setup
        }
      })
  }
}

const loadPageRequest = (page) => ({ type: LOAD_PAGE_REQUEST, page })
const loadSuccess = ({ games, count }) => ({ type: LOAD_SUCCESS, games, count })
const addRequest = (game) => ({ type: ADD_REQUEST, game })
const addSuccess = ({ game, count }) => ({ type: ADD_SUCCESS, game, count })
const deleteRequest = (game) => ({ type: DELETE_REQUEST, game })
const deleteSuccess = ({ game, count }) => ({ type: DELETE_SUCCESS, game, count })
const updateRequest = (game) => ({ type: UPDATE_REQUEST, game })
const updateSuccess = ({ game, count }) => ({ type: UPDATE_SUCCESS, game, count })
const error = (err) => ({ type: ERROR, error: err })

export const actions = {
  getGames,
  addGame,
  addSuccess,
  deleteSuccess,
  updateSuccess
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  games: [],
  _addedIds: {},
  isWorking: false,
  error: null,
  limit: 10,
  page: 0,
  count: 0
}

const requestActionHandler = (state) => ({ ...state, isWorking: true, error: null })

const actionHandlers = {
  [LOAD_PAGE_REQUEST]: (state, { page }) => ({ ...state, page }),

  [LOAD_SUCCESS]: (state, { games, count }) => ({ ...state, games, count, isWorking: false, error: null }),

  [ADD_REQUEST]: requestActionHandler,

  [DELETE_REQUEST]: requestActionHandler,

  [UPDATE_REQUEST]: requestActionHandler,

  [ADD_SUCCESS]: (state, { game, count }) => {
    const nextState = deepmerge(state, {
      isWorking: false,
      error: null,
      games: [game, ...state.games.slice(0, state.limit - 1)],
      count
    })
    return nextState
  },

  [DELETE_SUCCESS]: (state, { game, count }) => {
    const nextState = deepmerge(state, { isWorking: false, error: null, count })
    nextState.games = state.games.filter(g => g.id !== game.id)

    return nextState
  },

  [ERROR]: (state, { err }) => ({ ...state, isWorking: false, error: err })
}

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
