import * as React from 'react'


export const CardNameCacheContext = React.createContext()

function cardNameCacheReducer(state, action) {

  switch (action.type) {
    case 'ADD_CardName': { 
        return {...state, [action.cardItem.title]: action.cardItem.title} 
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const CardNameCacheProvider = (props) => {
  
    const [cache, dispatch] = React.useReducer(cardNameCacheReducer, {})
  
    const value = [cache, dispatch]
    return <CardNameCacheContext.Provider value={value} {...props} />
  }