
import * as React from 'react'

const CardItemFallback = ()=>{

    return (
        <section className="cardItem">
            <div className="cardItem__card">
                <img className="cardItem__card__img" src='img/no_image.png'  alt='fallback' /> 
                <h5 className="cardItem__card__title">loading ...</h5>
                <p className="cardItem__card__text">
                    loading ...
                </p>
            </div>
        </section>
    )
}

export default CardItemFallback;