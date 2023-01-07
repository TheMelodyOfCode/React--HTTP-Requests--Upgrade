

const CardNamesButtons = ({handleSelect})=>{

    return (
        <section  className="cardNames">
        <button
        className="cardNames__btn"
        type="button"
        onClick={() => handleSelect('rick')}
        >Rick</button>
        <button
        className="cardNames__btn"
        type="button"
        onClick={() => handleSelect('morty')}
        >Morty</button>
        <button
        className="cardNames__btn"
        type="button"
        onClick={() => handleSelect('snuggles')}
        >Snuggles</button>
        <button
        className="cardNames__btn"
        type="button"
        onClick={() => handleSelect('lucius')}
        >Lucius</button>
        <button
        className="cardNames__btn"
        type="button"
        onClick={() => handleSelect('squanchy')}
        >Squanchy</button>
        <button
        className="cardNames__btn"
        type="button"
        onClick={() => handleSelect('jerry')}
        >Jerry</button>
    </section>

    )

}

export default CardNamesButtons