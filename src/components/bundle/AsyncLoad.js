import React from 'react'
import Bundle from './Bundle'

const asyncLoad = (mod, props) => (
    <Bundle load={() => mod}>
        {(Comp) => <Comp {...props}/>}
    </Bundle>
)
export default asyncLoad