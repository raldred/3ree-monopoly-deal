import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import FullWidth from '../../../../components/FullWidth'
import JoinForm from '../../components/JoinForm'
import CardsOnHand from '../../components/CardsOnHand'
import Board from '../../components/Board'
import { getCurrentPlayer, isPlayerTurn } from '../../modules/gameSelectors'
import { actions as gameActions } from '../../modules/currentGame'
import { actions as playerCardsActions } from '../../modules/currentPlayerCards'

const mapStateToProps = (state) => ({
  game: state.currentGame.game,
  currentPlayer: getCurrentPlayer(state),
  currentPlayerCards: state.currentPlayerCards,
  isPlayerTurn: isPlayerTurn(state)
})

export class Game extends React.Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    currentPlayer: PropTypes.object,
    currentPlayerCards: PropTypes.object,
    placeCard: PropTypes.func.isRequired,
    playCard: PropTypes.func.isRequired,
    drawCards: PropTypes.func.isRequired,
    discardCard: PropTypes.func.isRequired,
    flipCard: PropTypes.func.isRequired,
    join: PropTypes.func.isRequired,
    endTurn: PropTypes.func.isRequired,
    isPlayerTurn: PropTypes.bool
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.currentPlayer || !nextProps.currentPlayer) {
      return
    }

    if (this.props.currentPlayer.actionCounter === nextProps.currentPlayer.actionCounter) {
      return
    }

    if (nextProps.currentPlayer.actionCounter === 3) {
      this.props.endTurn()
    }
  }

  render () {
    const {
      game,
      currentPlayer,
      join,
      currentPlayerCards,
      drawCards,
      placeCard,
      playCard,
      endTurn,
      discardCard,
      flipCard,
      isPlayerTurn
    } = this.props

    return (
      <FullWidth fluid>
        <h2>Game: {game.name}</h2>

        {currentPlayer &&
          <CardsOnHand
            cardsOnHand={currentPlayerCards.cardsOnHand}
            placedCards={currentPlayer.placedCards}
            onPlaceCard={placeCard}
            onPlayCard={playCard}
            onDrawCards={drawCards}
            onDiscardCard={discardCard}
            onFlipCard={flipCard}
            currentPlayer={currentPlayer}
            isPlayerTurn={isPlayerTurn}
          />
        }

        {currentPlayer &&
          <Board
            game={game}
            onEndTurn={endTurn}
            onDrawCards={drawCards}
            isPlayerTurn={isPlayerTurn}
            currentPlayer={currentPlayer}
          />
        }

        {!currentPlayer &&
          <JoinForm onJoin={join} />
        }
      </FullWidth>
    )
  }
}

export default connect(
  mapStateToProps,
  { ...gameActions, ...playerCardsActions }
)(Game)