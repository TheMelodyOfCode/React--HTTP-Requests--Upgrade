
import * as React from 'react'
import CardItemFallback from '../cardItemFallback/cardItemFallback';


const CardItem = ({stateOfRequest, cardItems}  )=>{

    const { quote, name ,imageUrl, } = cardItems;

    const { status, error} = stateOfRequest

    if (status === 'idle'){   
            return (    
                <section className="cardItem">
                <div className="cardItem__card">
                <h5 className="cardItem__card__title">Submit a Card-Name</h5>
                </div>
                </section>
            )
    } else if (status === 'pending') {
        return <CardItemFallback />
    }  else if (status === 'rejected') {
        throw error
        
    }   
    else if (status === 'resolved') {
    
    return (
        <section className="cardItem">
            <div className="cardItem__card">
                <img className="cardItem__card__img" src={`${imageUrl} `}  alt={name} /> 
                <h5 className="cardItem__card__title">{name}</h5>
                <p className="cardItem__card__text">
                    {quote}
                </p>
            </div>
        </section>
        )
    } 
    
}

export default CardItem;