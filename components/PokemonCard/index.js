import React from 'react'
import { Text } from 'react-native'
import { emit } from 'startupjs'
import { Div, Span, Avatar, Card, Row } from '@startupjs/ui'

import { POKEMON_TYPES } from '../../const'
import TagCustom from 'components/Tag'
import './index.styl'

const PokemonCard = ({
  data: { id, name, imageUrl, order, types, abilities, additionalInfo }
}) => {
  const onCardClick = () => {
    emit('url', '/pokemon/' + id)
  }

  return pug`
    Card.wrapper(onPress=onCardClick)
      Div.cardItem.first
        Avatar.avatar( size='xxl' src=imageUrl )
      Div.cardItem
        Span.order='#'+order
      Div.cardItem
        Span.name=name
      Div.cardItem
        if types
          Row
            each type, index in types
              TagCustom(
                first=index===0
                poison=type==='POISON'
                water=type==='WATER'
                electric=type==='ELECTRIC'
                fire=type==='FIRE'
                flying=type==='FLYING'
                key=index
              ) #{type.toUpperCase()}
      Div.cardItem
        Span=additionalInfo
      Div.cardItem
        Span.abilitiesTxt=abilities
  `
}

export default PokemonCard
