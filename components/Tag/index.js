import React from 'react'
import { Tag } from '@startupjs/ui'

import './index.styl'

const TagCustom = ({ children, first, poison, water, electric, fire, flying }) => {
  return pug`
    Tag.tag(
      styleName=[{first, poison, water, electric, fire, flying}]
    )=children
  `
}

export default TagCustom
