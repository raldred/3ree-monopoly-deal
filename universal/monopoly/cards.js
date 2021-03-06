/* @flow */
import { BASE_PATH } from '../config'

// ------------------------------------
// Types
// ------------------------------------
export const ACTION_CARD_TYPE = 'ACTION_CARD_TYPE'
export const PROPERTY_CARD_TYPE = 'PROPERTY_CARD_TYPE'
export const PROPERTY_WILDCARD_TYPE = 'PROPERTY_WILDCARD_TYPE'
export const PROPERTY_WILDCARD_ALL_COLOUR_TYPE = 'PROPERTY_WILDCARD_ALL_COLOUR_TYPE'
export const PROPERTY_ADDON_TYPE = 'PROPERTY_ADDON_TYPE'
export const RENT_CARD_TYPE = 'RENT_CARD_TYPE'
export const MONEY_CARD_TYPE = 'MONEY_CARD_TYPE'

// ------------------------------------
// Action cards
// ------------------------------------
export const HOUSE = 'HOUSE'
export const HOTEL = 'HOTEL'
export const DEAL_BREAKER = 'DEAL_BREAKER'
export const DOUBLE_RENT = 'DOUBLE'
export const FORCED_DEAL = 'FORCED_DEAL'
export const SAY_NO = 'SAY_NO'
export const BIRTHDAY = 'BIRTHDAY'
export const DEBT_COLLECTOR = 'DEBT_COLLECTOR'
export const PASS_GO = 'PASS_GO'
export const SLY_DEAL = 'SLY_DEAL'

// ------------------------------------
// Property cards
// ------------------------------------
export const PROPERTY_BROWN = 'PROPERTY_BROWN'
export const PROPERTY_BLUE = 'PROPERTY_BLUE'
export const PROPERTY_GREEN = 'PROPERTY_GREEN'
export const PROPERTY_LIGHT_BLUE = 'PROPERTY_LIGHT_BLUE'
export const PROPERTY_ORANGE = 'PROPERTY_ORANGE'
export const PROPERTY_PINK = 'PROPERTY_PINK'
export const PROPERTY_BLACK = 'PROPERTY_BLACK'
export const PROPERTY_RED = 'PROPERTY_RED'
export const PROPERTY_YELLOW = 'PROPERTY_YELLOW'
export const PROPERTY_LIGHT_GREEN = 'PROPERTY_LIGHT_GREEN'

export const PROPERTY_WILDCARD = 'PROPERTY_WILDCARD'

export const PROPERTY_LIGHT_BLUE_OR_BROWN = 'PROPERTY_LIGHT_BLUE_OR_BROWN'
export const PROPERTY_BROWN_OR_LIGHT_BLUE = 'PROPERTY_BROWN_OR_LIGHT_BLUE'

export const PROPERTY_PINK_OR_ORANGE = 'PROPERTY_PINK_OR_ORANGE'
export const PROPERTY_ORANGE_OR_PINK = 'PROPERTY_ORANGE_OR_PINK'

export const PROPERTY_GREEN_OR_BLACK = 'PROPERTY_GREEN_OR_BLACK'
export const PROPERTY_BLACK_OR_GREEN = 'PROPERTY_BLACK_OR_GREEN'

export const PROPERTY_GREEN_OR_BLUE = 'PROPERTY_GREEN_OR_BLUE'
export const PROPERTY_BLUE_OR_GREEN = 'PROPERTY_BLUE_OR_GREEN'

export const PROPERTY_LIGHT_BLUE_OR_BLACK = 'PROPERTY_LIGHT_BLUE_OR_BLACK'
export const PROPERTY_BLACK_OR_LIGHT_BLUE = 'PROPERTY_BLACK_OR_LIGHT_BLUE'

export const PROPERTY_LIGHT_GREEN_OR_BLACK = 'PROPERTY_LIGHT_GREEN_OR_BLACK'
export const PROPERTY_BLACK_OR_LIGHT_GREEN = 'PROPERTY_BLACK_OR_LIGHT_GREEN'

export const PROPERTY_YELLOW_OR_RED = 'PROPERTY_YELLOW_OR_RED'
export const PROPERTY_RED_OR_YELLOW = 'PROPERTY_RED_OR_YELLOW'

// ------------------------------------
// Rent cards
// ------------------------------------
export const RENT_ALL_COLOUR = 'RENT_ALL_COLOUR'
export const RENT_BLUE_OR_GREEN = 'RENT_BLUE_OR_GREEN'
export const RENT_LIGHT_BLUE_OR_BROWN = 'RENT_LIGHT_BLUE_OR_BROWN'
export const RENT_ORANGE_OR_PINK = 'RENT_ORANGE_OR_PINK'
export const RENT_BLACK_OR_LIGHT_GREEN = 'RENT_BLACK_OR_LIGHT_GREEN'
export const RENT_RED_OR_YELLOW = 'RENT_RED_OR_YELLOW'

// ------------------------------------
// Money
// ------------------------------------
export const MONEY_10M = 'MONEY_10M'
export const MONEY_5M = 'MONEY_5M'
export const MONEY_4M = 'MONEY_4M'
export const MONEY_3M = 'MONEY_3M'
export const MONEY_2M = 'MONEY_2M'
export const MONEY_1M = 'MONEY_1M'

// ------------------------------------
// Others
// ------------------------------------
export const HOUSE_ADDON_AMOUNT = 3
export const HOTEL_ADDON_AMOUNT = 4

export const CARDS: MapOfCards = setMissingProperties({
  [HOUSE]: {
    count: 3,
    value: 3,
    image: `${BASE_PATH}/images/cards/house.png`,
    type: PROPERTY_ADDON_TYPE
  },

  [HOTEL]: {
    count: 3,
    value: 4,
    image: `${BASE_PATH}/images/cards/hotel.png`,
    type: PROPERTY_ADDON_TYPE
  },

  [DEAL_BREAKER]: {
    count: 2,
    value: 4,
    image: `${BASE_PATH}/images/cards/deal-breaker.png`,
    type: ACTION_CARD_TYPE
  },

  [DEBT_COLLECTOR]: {
    count: 3,
    value: 3,
    paymentAmount: 5,
    image: `${BASE_PATH}/images/cards/debt-collector.png`,
    type: ACTION_CARD_TYPE
  },

  [DOUBLE_RENT]: {
    count: 2,
    value: 1,
    image: `${BASE_PATH}/images/cards/double-rent.png`,
    type: ACTION_CARD_TYPE
  },

  [FORCED_DEAL]: {
    count: 3,
    value: 3,
    image: `${BASE_PATH}/images/cards/forced-deal.png`,
    type: ACTION_CARD_TYPE
  },

  [BIRTHDAY]: {
    count: 3,
    value: 2,
    paymentAmount: 2,
    image: `${BASE_PATH}/images/cards/birthday.png`,
    type: ACTION_CARD_TYPE
  },

  [SAY_NO]: {
    count: 3,
    value: 4,
    image: `${BASE_PATH}/images/cards/say-no.png`,
    type: ACTION_CARD_TYPE
  },

  [PASS_GO]: {
    count: 10,
    value: 1,
    image: `${BASE_PATH}/images/cards/pass-go.png`,
    type: ACTION_CARD_TYPE
  },

  [SLY_DEAL]: {
    count: 3,
    value: 3,
    image: `${BASE_PATH}/images/cards/sly-deal.png`,
    type: ACTION_CARD_TYPE
  },

  [PROPERTY_BROWN]: {
    count: 2,
    value: 1,
    needs: 2,
    rent: [1, 2],
    image: `${BASE_PATH}/images/cards/property-brown.png`,
    type: PROPERTY_CARD_TYPE
  },

  [PROPERTY_BLUE]: {
    count: 2,
    value: 4,
    needs: 2,
    rent: [3, 8],
    image: `${BASE_PATH}/images/cards/property-blue.png`,
    type: PROPERTY_CARD_TYPE
  },

  [PROPERTY_GREEN]: {
    count: 3,
    value: 4,
    needs: 3,
    rent: [2, 4, 7],
    image: `${BASE_PATH}/images/cards/property-green.png`,
    type: PROPERTY_CARD_TYPE
  },

  [PROPERTY_LIGHT_BLUE]: {
    count: 3,
    value: 1,
    needs: 3,
    rent: [1, 2, 3],
    image: `${BASE_PATH}/images/cards/property-light-blue.png`,
    type: PROPERTY_CARD_TYPE
  },

  [PROPERTY_ORANGE]: {
    count: 3,
    value: 2,
    needs: 3,
    rent: [1, 3, 5],
    image: `${BASE_PATH}/images/cards/property-orange.png`,
    type: PROPERTY_CARD_TYPE
  },

  [PROPERTY_PINK]: {
    count: 3,
    value: 2,
    needs: 3,
    rent: [1, 2, 4],
    image: `${BASE_PATH}/images/cards/property-pink.png`,
    type: PROPERTY_CARD_TYPE
  },

  [PROPERTY_BLACK]: {
    count: 4,
    value: 2,
    needs: 4,
    rent: [1, 2, 3, 4],
    canAddHouseOrHotel: false,
    image: `${BASE_PATH}/images/cards/property-black.png`,
    type: PROPERTY_CARD_TYPE
  },

  [PROPERTY_RED]: {
    count: 3,
    value: 3,
    needs: 3,
    rent: [2, 3, 6],
    image: `${BASE_PATH}/images/cards/property-red.png`,
    type: PROPERTY_CARD_TYPE
  },

  [PROPERTY_YELLOW]: {
    count: 3,
    value: 3,
    needs: 3,
    rent: [2, 4, 6],
    image: `${BASE_PATH}/images/cards/property-yellow.png`,
    type: PROPERTY_CARD_TYPE
  },

  [PROPERTY_LIGHT_GREEN]: {
    count: 2,
    value: 2,
    needs: 2,
    rent: [1, 2],
    canAddHouseOrHotel: false,
    image: `${BASE_PATH}/images/cards/property-light-green.png`,
    type: PROPERTY_CARD_TYPE
  },

  [PROPERTY_WILDCARD]: {
    count: 2,
    value: 0,
    image: `${BASE_PATH}/images/cards/property-wildcard.png`,
    type: PROPERTY_WILDCARD_ALL_COLOUR_TYPE
  },

  [PROPERTY_GREEN_OR_BLUE]: {
    count: 1,
    value: 4,
    image: `${BASE_PATH}/images/cards/property-green-or-blue.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_GREEN,
    flipTo: PROPERTY_BLUE_OR_GREEN
  },

  [PROPERTY_BLUE_OR_GREEN]: {
    count: 0,
    value: 4,
    image: `${BASE_PATH}/images/cards/property-blue-or-green.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_BLUE,
    flipTo: PROPERTY_GREEN_OR_BLUE
  },

  [PROPERTY_LIGHT_BLUE_OR_BROWN]: {
    count: 1,
    value: 1,
    image: `${BASE_PATH}/images/cards/property-light-blue-or-brown.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_LIGHT_BLUE,
    flipTo: PROPERTY_BROWN_OR_LIGHT_BLUE
  },

  [PROPERTY_BROWN_OR_LIGHT_BLUE]: {
    count: 0,
    value: 1,
    image: `${BASE_PATH}/images/cards/property-brown-or-light-blue.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_BROWN,
    flipTo: PROPERTY_LIGHT_BLUE_OR_BROWN
  },

  [PROPERTY_PINK_OR_ORANGE]: {
    count: 2,
    value: 2,
    image: `${BASE_PATH}/images/cards/property-pink-or-orange.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_PINK,
    flipTo: PROPERTY_ORANGE_OR_PINK
  },

  [PROPERTY_ORANGE_OR_PINK]: {
    count: 0,
    value: 2,
    image: `${BASE_PATH}/images/cards/property-orange-or-pink.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_ORANGE,
    flipTo: PROPERTY_PINK_OR_ORANGE
  },

  [PROPERTY_GREEN_OR_BLACK]: {
    count: 1,
    value: 4,
    image: `${BASE_PATH}/images/cards/property-green-or-black.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_GREEN,
    flipTo: PROPERTY_BLACK_OR_GREEN
  },

  [PROPERTY_BLACK_OR_GREEN]: {
    count: 0,
    value: 4,
    image: `${BASE_PATH}/images/cards/property-black-or-green.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_BLACK,
    flipTo: PROPERTY_GREEN_OR_BLACK
  },

  [PROPERTY_LIGHT_BLUE_OR_BLACK]: {
    count: 1,
    value: 4,
    image: `${BASE_PATH}/images/cards/property-light-blue-or-black.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_LIGHT_BLUE,
    flipTo: PROPERTY_BLACK_OR_LIGHT_BLUE
  },

  [PROPERTY_BLACK_OR_LIGHT_BLUE]: {
    count: 0,
    value: 4,
    image: `${BASE_PATH}/images/cards/property-black-or-light-blue.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_BLACK,
    flipTo: PROPERTY_LIGHT_BLUE_OR_BLACK
  },

  [PROPERTY_LIGHT_GREEN_OR_BLACK]: {
    count: 1,
    value: 2,
    image: `${BASE_PATH}/images/cards/property-light-green-or-black.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_LIGHT_GREEN,
    flipTo: PROPERTY_BLACK_OR_LIGHT_GREEN
  },

  [PROPERTY_BLACK_OR_LIGHT_GREEN]: {
    count: 0,
    value: 2,
    image: `${BASE_PATH}/images/cards/property-black-or-light-green.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_BLACK,
    flipTo: PROPERTY_LIGHT_GREEN_OR_BLACK
  },

  [PROPERTY_YELLOW_OR_RED]: {
    count: 2,
    value: 3,
    image: `${BASE_PATH}/images/cards/property-yellow-or-red.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_YELLOW,
    flipTo: PROPERTY_RED_OR_YELLOW
  },

  [PROPERTY_RED_OR_YELLOW]: {
    count: 0,
    value: 3,
    image: `${BASE_PATH}/images/cards/property-red-or-yellow.png`,
    type: PROPERTY_WILDCARD_TYPE,
    treatAs: PROPERTY_RED,
    flipTo: PROPERTY_YELLOW_OR_RED
  },

  [RENT_ALL_COLOUR]: {
    count: 3,
    value: 3,
    image: `${BASE_PATH}/images/cards/rent-all-colour.png`,
    type: RENT_CARD_TYPE
  },

  [RENT_BLUE_OR_GREEN]: {
    count: 2,
    value: 1,
    image: `${BASE_PATH}/images/cards/rent-blue-or-green.png`,
    forCards: [PROPERTY_BLUE, PROPERTY_GREEN],
    type: RENT_CARD_TYPE
  },

  [RENT_LIGHT_BLUE_OR_BROWN]: {
    count: 2,
    value: 1,
    image: `${BASE_PATH}/images/cards/rent-light-blue-or-brown.png`,
    forCards: [PROPERTY_LIGHT_BLUE, PROPERTY_BROWN],
    type: RENT_CARD_TYPE
  },

  [RENT_ORANGE_OR_PINK]: {
    count: 2,
    value: 1,
    image: `${BASE_PATH}/images/cards/rent-orange-or-pink.png`,
    forCards: [PROPERTY_ORANGE, PROPERTY_PINK],
    type: RENT_CARD_TYPE
  },

  [RENT_BLACK_OR_LIGHT_GREEN]: {
    count: 2,
    value: 1,
    image: `${BASE_PATH}/images/cards/rent-black-or-light-green.png`,
    forCards: [PROPERTY_BLACK, PROPERTY_LIGHT_GREEN],
    type: RENT_CARD_TYPE
  },

  [RENT_RED_OR_YELLOW]: {
    count: 2,
    value: 1,
    image: `${BASE_PATH}/images/cards/rent-red-or-yellow.png`,
    forCards: [PROPERTY_RED, PROPERTY_YELLOW],
    type: RENT_CARD_TYPE
  },

  [MONEY_1M]: {
    count: 6,
    value: 1,
    image: `${BASE_PATH}/images/cards/money-1m.png`,
    type: MONEY_CARD_TYPE
  },

  [MONEY_2M]: {
    count: 5,
    value: 2,
    image: `${BASE_PATH}/images/cards/money-2m.png`,
    type: MONEY_CARD_TYPE
  },

  [MONEY_3M]: {
    count: 3,
    value: 3,
    image: `${BASE_PATH}/images/cards/money-3m.png`,
    type: MONEY_CARD_TYPE
  },

  [MONEY_4M]: {
    count: 3,
    value: 4,
    image: `${BASE_PATH}/images/cards/money-4m.png`,
    type: MONEY_CARD_TYPE
  },

  [MONEY_5M]: {
    count: 2,
    value: 5,
    image: `${BASE_PATH}/images/cards/money-5m.png`,
    type: MONEY_CARD_TYPE
  }
})

export const MAX_CARDS_IN_HAND = 7

export function newDeck (): CardKey[] {
  let cards = []

  Object.keys(CARDS).map(key => {
    const type = CARDS[key]

    cards = cards.concat(Array(type.count).fill(key))
  })

  return shuffle(cards)
}

export function shuffle (cards: CardKey[]): CardKey[] {
  let j, x, i

  for (i = cards.length; i; i--) {
    j = Math.floor(Math.random() * i)
    x = cards[i - 1]
    cards[i - 1] = cards[j]
    cards[j] = x
  }

  return cards
}

export function getCardObject (cardKeyOrCard: CardKeyOrCard): Card {
  return typeof cardKeyOrCard === 'string' ? CARDS[cardKeyOrCard] : cardKeyOrCard
}

// Side effect
function setMissingProperties (cards: Object): MapOfCards {
  Object.keys(cards).map((key) => {
    const card = cards[key]
    card.key = key
    card.treatAs = card.treatAs ? card.treatAs : card.key
    card.canAddHouseOrHotel = card.hasOwnProperty('canAddHouseOrHotel') ? card.canAddHouseOrHotel : true
  })
  return cards
}
