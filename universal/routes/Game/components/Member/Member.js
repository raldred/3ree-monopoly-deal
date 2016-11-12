import React, { PropTypes } from 'react'
import PlacedCards from '../PlacedCards'

export default class Member extends React.Component {
  static propTypes = {
    member: PropTypes.object.isRequired
  }

  render () {
    const { member } = this.props

    return (
      <div>
        <PlacedCards cards={member.placedCards} />
      </div>
    )
  }
}

