
import React, { useState } from 'react'
import { observer, usePage, useQuery } from 'startupjs'
import { Div, Pagination, Select, Row } from '@startupjs/ui'

import './index.styl'

const pageSizes = [6, 12]

const PokemonsPagination = observer(() => {
  const [currentPage, setCurrentPage] = useState()
  const [curPagesSize, setCurPageSize] = useState(6)
  const [, $page] = usePage('page')
  const [pageSize = 6, $pageSize] = usePage('pageSize')
  const [search] = usePage('search')
  const [filterValues = []] = usePage('filterValues')

  const $match = {
    _type: { $ne: null }
  }

  if (search) {
    $match.name = { $regex: search, $options: 'i' }
  }
  if (filterValues.length) {
    $match.types = { $in: filterValues }
  }

  const [[{ count = 0 } = {}]] = useQuery('pokemons', {
    $aggregate: [
      { $match },
      { $count: 'count' }
    ]
  })

  const onPageChange = (val) => {
    $page.set(val)
    setCurrentPage(val)
  }

  const onPageSizeChange = (val) => {
    $pageSize.set(val)
    setCurPageSize(val)
  }

  return pug`
    Row.root
      Pagination(
        variant='compact'
        page=currentPage
        pages=Math.ceil(count / pageSize)
        onChangePage=onPageChange
      )
      Select(
        value=curPagesSize
        onChange=onPageSizeChange
        options=pageSizes
        showEmptyValue=false
      )
  `
})

export default PokemonsPagination