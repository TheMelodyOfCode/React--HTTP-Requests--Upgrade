

const Form = ({handleSubmit,handleChange, handleSelect, nameByInputField})=>{


    return (
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

    )


}

export default Form;