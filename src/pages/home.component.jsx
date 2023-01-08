import * as React from 'react'

import CardItem from "../components/cardItem/cardItem.component";
import { getSingleDocfromDB } from '../utils/firebase.utils';
import {ErrorBoundary} from 'react-error-boundary'
import CardNamesButtons from '../components/cardNamesButtons/cardNamesButtons.component';
import PreviousCards from '../components/previousCards/previousCards.component';



const Home = ()=>{

    const [cardItems, setCardItems] =  React.useState({})
    const [nameByButton, setnameByButton] = React.useState('')
    const [nameByInputField, setnameByInputField] = React.useState('')

    const [stateOfRequest, setStateOfRequest] = React.useState({
        status: 'idle',
        error: null,
        message: '',
      })
    
    const { message} = stateOfRequest
    
        React.useEffect(()=>{ 
            if (!nameByButton) {
                return
            }
            setnameByButton('')
            setStateOfRequest({status: 'pending'})
            const getCardItem = async ()=> {
                if (typeof nameByButton === 'string') {
                    const cardItem = await getSingleDocfromDB(nameByButton)
                        setCardItems(cardItem)
                        setStateOfRequest({status: 'resolved'})
                  }
            };
            getCardItem()

    }, [nameByButton]);


    const resetnameByButton = ()=>{
        setnameByButton('')
    }

    const  handleChange = async (e) => {
        resetnameByButton()
        setnameByInputField(e.target.value.toLowerCase() )  
      }



    const handleSubmit = (e) => {
        e.preventDefault()
        if (!nameByInputField) {
            return
        }
        resetnameByButton()
        setnameByInputField('')
        setStateOfRequest({status: 'pending'})
        const getCardByInput = async ()=> {
            if (typeof nameByInputField === 'string') {
                const cardItem = await getSingleDocfromDB(nameByInputField)
                console.log(cardItem)
                if (cardItem.error === 'error') {
                    setStateOfRequest({error: 'error', status: 'rejected', message: cardItem.message})
                    
                } else {
                    setCardItems(cardItem)
                    setStateOfRequest({status: 'resolved'})
                }

              }
        };
        getCardByInput()
      }

    const  handleSelect = async (newCardName) => {
        setnameByButton(newCardName)    
      }

      function ErrorFallback({error, resetErrorBoundary,}) {
        return (
            <section  className="cardItemError">
                <div role="alert" className="cardItemError__card">
                    <img className="cardItemError__card__img" src='img/sadError.png'  alt='error' />
                    <h1 className="cardItemError__card__title">There was an error: {''}</h1>
                    <pre style={{whiteSpace: 'normal'}}>{error.message} </pre>
                    <p className="cardItemError__card__text">
                        {message}
                    </p> 
                    <button className="cardItemError__errorBtn" onClick={resetErrorBoundary}>Try again</button> 
                </div>
            </section>
        )
    }

    function handleReset(){
        setnameByButton('')
        setnameByInputField('')
        setCardItems({})
        setStateOfRequest({error: null, status: 'idle'})
    }

    return (

        <>
            
            <form onSubmit={handleSubmit} className="form">
                <input 
                type="text" 
                className="form__input" 
                placeholder="type: rick" 
                name="nameByInputField" 
                value={nameByInputField}
                onChange={handleChange}
                />
                <button className="form__btn btn" type="submit" disabled={!nameByInputField.length} >Submit</button>
            </form>

            <ErrorBoundary  FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[nameByButton,nameByInputField]} >
                <CardNamesButtons handleSelect={handleSelect} />
                <CardItem  stateOfRequest={stateOfRequest} cardItems={cardItems} />
                <PreviousCards />
            </ErrorBoundary>
            
        </>

    )

}

export default Home;