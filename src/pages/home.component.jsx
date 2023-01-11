import * as React from 'react'

import CardItem from "../components/cardItem/cardItem.component";
import {getSingleDocfromDB } from '../utils/firebase.utils';
import {ErrorBoundary} from 'react-error-boundary'
import PreviousCardName from '../components/previousCardName/previousCardName.component'
import { CardNameCacheProvider } from '../context/cardNameCache.context';
import Form from '../form/form.component';

// const CardNameCacheContext = React.createContext()

// function cardNameCacheReducer(state, action) {

//   switch (action.type) {
//     case 'ADD_CardName': { 
//         return {...state, [action.cardItem.title]: action.cardItem.title} 
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

// function CardNameCacheProvider(props) {
  
//   const [cache, dispatch] = React.useReducer(cardNameCacheReducer, {})

//   const value = [cache, dispatch]
//   return <CardNameCacheContext.Provider value={value} {...props} />
// }

// function useCardNameCache(){
//     const context = React.useContext(CardNameCacheContext)
//     if(!context) {
//       throw new Error('useCardNameCache must be used in a CardNameCacheContext')
//     }
//     return context
//   }


// function PreviousCardName({ onSelect, cardItem}) {
  
//     const [cache, dispatch] = useCardNameCache()

//     React.useEffect(() => {
//       if (Object.keys(cardItem).length === 0) {
//         return
//       } else  {
//         dispatch({type: 'ADD_CardName', cardItem})
//       }
//     }, [dispatch, cardItem,])


//         return (
//           <section className="previousCard">
  
//               <div>
//                   <h6 className="previousCard__title">Previous Selection</h6> 
//                   <ul className="previousCard__uoList">
//                   {
//                   Object.keys(cache).map(cardName => (
                   
//                       <li className="previousCard__uoList--Item" key={cardName} style={{margin: '4px auto'}}>
//                           <button
//                           className="previousCard__btn btn"
//                           style={{width: '100%'}}
//                           onClick={() => onSelect(cardName)}
//                       >
//                           {cardName}
//                           </button>
//                       </li>
//                   )) }
//                   </ul>
//               </div>
//           </section>
//       )  
// }



const Home = ()=>{


    const [cardItem, setCardItem] =  React.useState({})
    const [nameByInputField, setnameByInputField] = React.useState('')

    const [stateOfRequest, setStateOfRequest] = React.useState({
        status: 'idle',
        error: null,
        message: '',
      })
    
    const {message} = stateOfRequest
    

    const  handleChange = async (e) => {
        e.preventDefault()
        setnameByInputField(e.target.value.toLowerCase() )  
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!nameByInputField) {
            return
        }
        setnameByInputField('')
        setStateOfRequest({status: 'pending'})
        const getCardByInput = async ()=> {
            if (typeof nameByInputField === 'string') {
                const cardItem = await getSingleDocfromDB(nameByInputField)
                if (cardItem.error === 'error') {
                    setStateOfRequest({error: 'error', status: 'rejected', message: cardItem.message})    
                } else {
                    setCardItem(cardItem)
                    setStateOfRequest({status: 'resolved'})
                }

              }
        };
        getCardByInput()
      }

    const  handleSelect = async (newCardName) => {
        setnameByInputField(newCardName.toLowerCase())  
        handleSubmit(newCardName.toLowerCase())
      }

    function handleReset(){
        setnameByInputField('')
        setStateOfRequest({error: null, status: 'idle'})
        setCardItem({})
    }


    function ErrorFallback({error, resetErrorBoundary,}) {
      return (
          <section  className="cardItemError">
              <div role="alert" className="cardItemError__card">
                  <img className="cardItemError__card__img" src='img/sadError.png'  alt='error' />
                  <h1 className="cardItemError__card__title">There was an error: {''}</h1>
                  {/* <pre style={{whiteSpace: 'normal'}}>{error.message} </pre> */}
                  <p className="cardItemError__card__text">
                      {error.message}
                      {message}
                  </p> 
                  <button className="cardItemError__errorBtn" onClick={resetErrorBoundary}>Try again</button> 
              </div>
          </section>
      )
  }

    return (
        <>
        <ErrorBoundary  FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[nameByInputField]} >
              <Form handleSubmit={handleSubmit} handleChange={handleChange} handleSelect={handleSelect} nameByInputField={nameByInputField}  />
          <CardNameCacheProvider>
              <CardItem  stateOfRequest={stateOfRequest} cardItem={cardItem} />
              <PreviousCardName onSelect={handleSelect} cardItem={cardItem}  />
          </CardNameCacheProvider>
        </ErrorBoundary>  
        </>

    )

}

export default Home;