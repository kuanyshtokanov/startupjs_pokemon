import React from 'react'
import { model, emit } from 'startupjs'
import { Div, Span, Avatar, Card, Button, Row } from '@startupjs/ui'

import { POKEMON_TYPES } from '../../const'
import TagCustom from 'components/Tag'
import './index.styl'

const PokemonCard = ({
  data: { id, name, imageUrl, order, types, abilities, additionalInfo },
  detailForm
}) => {
  const curTypes = types.map(item => item.toLowerCase())
  const onEditClick = () => {
    emit('url', '/pokemon/form/edit/' + id)
  }

  const onDeleteClick = async () => {
    await model.del('pokemons.' + id)
    emit('url', '/')
  }

  return pug`
    Card.wrapper(styleName={detailForm})
      Div.top
        Span.name=name
        if order
          Span.order='#'+order
      Div.middle
        Div.avatar
          Avatar.avatarImg( size='xxl' src=imageUrl )
        Div.right
          Div.additionalInfo
            Span.additionalInfoTxt=additionalInfo
          if types
            Div.types
              Span.typesLabel='Types:'
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
          Div.abilities
            Span.abilitiesLabel='Abilities:'
            Span.abilitiesTxt=abilities
          Div.buttons
            Button(
              onPress=onEditClick
            ) Edit
            Button.btn(
              onPress=onDeleteClick
            ) Delete
  `
}
// style=({ backgroundColor: (POKEMON_TYPES.find(t=> t.name === type) || []).color })

export default PokemonCard
