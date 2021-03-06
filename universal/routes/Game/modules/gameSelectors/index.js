/* @flow */
import { SAY_NO } from '../../../../monopoly/cards'
import { createSelector } from 'reselect'
import type { CurrentGameState } from '../currentGame'
import type { PaymentState } from '../payment'
import type { CurrentPlayerCardsOnHandState } from '../currentPlayerCardsOnHand'
import type { SayNoState } from '../sayNo'
import type { CardRequestState } from '../cardRequest'

const getCurrentGame = state => state.currentGame
const getPayment = state => state.payment
const getCurrentPlayerCardsOnHand = state => state.currentPlayerCardsOnHand
const getSayNoState = state => state.sayNo
const getCardRequest = state => state.cardRequest

export const getCurrentPlayer = createSelector(
  getCurrentGame,
  (currentGame: CurrentGameState): ?Player => {
    const game = currentGame.game

    if (!game) {
      return
    }

    const membership = currentGame.membership[game.id] || {}
    return game.players.find(player => player.id === membership.id)
  }
)

export const isPlayerTurn = createSelector(
  getCurrentGame, getCurrentPlayer,
  (currentGame: CurrentGameState, currentPlayer: ?Player): boolean => {
    return !!(
      currentPlayer &&
      currentGame.game &&
      currentGame.game.currentTurn &&
      currentGame.game.currentTurn === currentPlayer.username
    )
  }
)

export const getOtherPlayers = createSelector(
  getCurrentGame, getCurrentPlayer,
  (currentGame: CurrentGameState, currentPlayer: ?Player): Player[] => {
    if (!currentPlayer || !currentGame.game) {
      return []
    }

    const thisPlayer = currentPlayer
    return currentGame.game.players.filter(player => player.id !== thisPlayer.id)
  }
)

export const isPayee = createSelector(
  getCurrentPlayer, getPayment,
  (currentPlayer: ?Player, payment: PaymentState): boolean => {
    return !!(currentPlayer && payment.amount && payment.payee === currentPlayer.username)
  }
)

export const isPayer = createSelector(
  getCurrentPlayer, getPayment,
  (currentPlayer: ?Player, payment: PaymentState): boolean => {
    return !!(currentPlayer && payment.payers && payment.payers.includes(currentPlayer.username))
  }
)

export const canSayNo = createSelector(
  getCurrentPlayerCardsOnHand,
  (currentPlayerCardsOnHand: CurrentPlayerCardsOnHandState): boolean => {
    return currentPlayerCardsOnHand.cardsOnHand.includes(SAY_NO)
  }
)

export const canRespondToASayNo = createSelector(
  canSayNo, getSayNoState, getCurrentPlayer,
  (canSayNo: boolean, sayNo: SayNoState, currentPlayer: ?Player): boolean => {
    return !!currentPlayer && currentPlayer.username === sayNo.toUser && canSayNo
  }
)

export const paymentOrCardRequestStillPending = createSelector(
  getCurrentGame, getCurrentPlayer, getPayment, getCardRequest,
  (
    currentGame: CurrentGameState,
    currentPlayer: ?Player,
    payment: PaymentState,
    cardRequest: CardRequestState
  ): boolean => {
    if (!currentGame.game || !currentPlayer) {
      return false
    }

    const { username } = currentPlayer

    return (payment.payers && payment.payers.includes(username)) ||
      payment.payee === username ||
      cardRequest.slyDeal.fromUser === username ||
      cardRequest.slyDeal.toUser === username ||
      cardRequest.forcedDeal.fromUser === username ||
      cardRequest.forcedDeal.toUser === username ||
      cardRequest.dealBreaker.fromUser === username ||
      cardRequest.dealBreaker.toUser === username
  }
)
