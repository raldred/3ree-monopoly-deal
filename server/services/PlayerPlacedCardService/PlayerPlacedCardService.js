/* @flow */
import PlayerRepository from '../../repositories/PlayerRepository'
import GameService from '../GameService'
import GameHistoryService from '../GameHistoryService'
import * as monopoly from '../../../universal/monopoly/monopoly'
import * as sideEffectUtils from '../../side-effect-utils'
import * as propertySetUtils from '../../property-set-utils'
import { markCard } from '../../../universal/monopoly/logMessageParser'
import PropertySet from '../../../universal/monopoly/PropertySet'
import type { PropertySetId } from '../../../universal/monopoly/PropertySet'

export default class PlayerPlacedCardService {
  playerRepository: PlayerRepository
  gameService: GameService
  gameHistoryService: GameHistoryService

  constructor () {
    this.playerRepository = new PlayerRepository()
    this.gameService = new GameService()
    this.gameHistoryService = new GameHistoryService()
  }

  async flipPlacedCard (
    gameId: string, username: Username, cardKey: CardKey, propertySetId: PropertySetId
  ): Promise<CardKey> {
    if (!monopoly.canFlipCard(cardKey)) {
      throw new Error(`Cannot flip ${cardKey}`)
    }

    const flippedCardKey: CardKey = monopoly.flipCard(cardKey)

    const player = await this.playerRepository.findByGameIdAndUsername(gameId, username)

    const setToUpdateIndex = propertySetUtils.getSetIndexBySetId(
      propertySetId,
      player.placedCards.serializedPropertySets
    )

    if (setToUpdateIndex < 0) {
      throw new Error(`Cannot find the set with id ${propertySetId}`)
    }

    const setToUpdate = player.placedCards.serializedPropertySets[setToUpdateIndex]

    sideEffectUtils.removeFirstInstanceFromArray(cardKey, setToUpdate.cards)

    const newSet = new PropertySet(monopoly.getPropertySetIdentifier(flippedCardKey), [flippedCardKey])
    sideEffectUtils.addSetToPlacedCards(newSet.serialize(), player.placedCards)

    if (!setToUpdate.cards.length) {
      sideEffectUtils.removeSetFromPlacedCardsBySetIndex(setToUpdateIndex, player.placedCards)
    }

    player.actionCounter += 1

    await Promise.all([
      player.save(),
      this.gameHistoryService.record(gameId, `${username} flipped ${markCard(cardKey)}`)
    ])

    return flippedCardKey
  }

  async flipPlacedLeftOverCard (gameId: string, username: Username, cardKey: CardKey): Promise<CardKey> {
    if (!monopoly.canFlipCard(cardKey)) {
      throw new Error(`Cannot flip ${cardKey}`)
    }

    const flippedCardKey: CardKey = monopoly.flipCard(cardKey)

    const player = await this.playerRepository.findByGameIdAndUsername(gameId, username)

    const cardIndex = player.placedCards.leftOverCards.findIndex(c => c === cardKey)

    if (cardIndex === -1) {
      throw new Error(`Cannot find the card ${cardKey} in the left over list`)
    }

    sideEffectUtils.replaceItemInArray(player.placedCards.leftOverCards, cardIndex, flippedCardKey)
    player.actionCounter += 1

    await Promise.all([
      player.save(),
      this.gameHistoryService.record(gameId, `${username} flipped ${markCard(cardKey)}`)
    ])

    return flippedCardKey
  }

  async movePlacedCard (
    gameId: string, username: Username, cardKey: CardKey, fromSetId: PropertySetId, toSetId: PropertySetId
  ): Promise<*> {
    const player = await this.playerRepository.findByGameIdAndUsername(gameId, username)

    const mapOfSetIndexes: Map<PropertySetId, number> = new Map()

    player.placedCards.serializedPropertySets.forEach((set, index) => {
      mapOfSetIndexes.set(PropertySet.unserialize(set).getId(), index)
    })

    const fromSetIndex = mapOfSetIndexes.get(fromSetId)
    const toSetIndex = mapOfSetIndexes.get(toSetId)

    if (fromSetIndex === undefined || toSetIndex === undefined) {
      throw new Error(`Cannot find sets: ${fromSetId}, ${toSetId}`)
    }

    const fromSet = player.placedCards.serializedPropertySets[fromSetIndex]
    const toSet = player.placedCards.serializedPropertySets[toSetIndex]

    // Validate the move
    if (!PropertySet.unserialize(toSet).canAddCard(cardKey)) {
      throw new Error(`Cannot move card ${cardKey} to ${toSetId}`)
    }

    sideEffectUtils.removeFirstInstanceFromArray(cardKey, fromSet.cards)
    sideEffectUtils.addItemToArray(cardKey, toSet.cards)

    // After moving, if the set is empty, remove it completely
    if (!fromSet.cards.length) {
      sideEffectUtils.removeSetFromPlacedCardsBySetIndex(fromSetIndex, player.placedCards)
    }

    return Promise.all([
      player.save(),
      this.gameHistoryService.record(gameId, `${username} moved ${markCard(cardKey)} to another set`)
    ])
  }

  async movePlacedLeftOverCard (
    gameId: string, username: Username, cardKey: CardKey, toSetId: PropertySetId
  ): Promise<*> {
    const player = await this.playerRepository.findByGameIdAndUsername(gameId, username)

    const toSet = player.placedCards.serializedPropertySets.find(
      set => PropertySet.unserialize(set).getId() === toSetId
    )

    if (!toSet) {
      throw new Error(`Cannot find set: ${toSetId}`)
    }

    // Validate the move
    if (!PropertySet.unserialize(toSet).canAddCard(cardKey)) {
      throw new Error(`Cannot move card ${cardKey} to ${toSetId}`)
    }

    sideEffectUtils.removeFirstInstanceFromArray(cardKey, player.placedCards.leftOverCards)
    sideEffectUtils.addItemToArray(cardKey, toSet.cards)

    player.actionCounter += 1

    return Promise.all([
      player.save(),
      this.gameHistoryService.record(gameId, `${username} moved ${markCard(cardKey)} to another set`)
    ])
  }
}
