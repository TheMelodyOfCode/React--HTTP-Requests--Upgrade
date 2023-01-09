import * as React from 'react'

import CardItem from "../components/cardItem/cardItem.component";
import { getSingleDocfromDB } from '../utils/firebase.utils';
import {ErrorBoundary} from 'react-error-boundary'
// import PreviousCards from '../components/previousCards/previousCards.component';


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
        setnameByInputField(newCardName)  
        handleSubmit(newCardName)
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
                    <pre style={{whiteSpace: 'normal'}}>{error.message} </pre>
                    <p className="cardItemError__card__text">
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
    <section  className="cardNames">

        <form onSubmit={handleSubmit} className="cardNames__form">
            <div className="cardNames__form__box">
            <input 
                type="text" 
                className="cardNames__form__box__input" 
                placeholder="type: rick" 
                name="nameByInputField" 
                value={nameByInputField}
                onChange={handleChange}
                />
                <button className="cardNames__form__box__btn btn" type="submit" disabled={!nameByInputField.length} >Submit</button>
            </div>
            <div class="cardNames__container">
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('rick')}
                >Rick</button>
                {' '}
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('morty')}
                >Morty</button>
                {' '}
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('snuggles')}
                >Snuggles</button>
                {' '}
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('lucius')}
                >Lucius</button>
                {' '}
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('squanchy')}
                >Squanchy</button>
                {' '}
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('jerry')}
                >Jerry</button>
                {' '}
            </div>
        </form>
    </section>

                <CardItem  stateOfRequest={stateOfRequest} cardItem={cardItem} />
                {/* <PreviousCards /> */}
        <section className="previousCard">
            <div>
                <h6 className="previousCard__title">Previous Selection</h6> 
                <ul className="previousCard__uoList">
                    <li className="previousCard__uoList--Item">
                        <button className="previousCard__btn btn">CardName</button>
                    </li>
                </ul>
            </div>
        </section>
            </ErrorBoundary>  
        </>

    )

}

export default Home;