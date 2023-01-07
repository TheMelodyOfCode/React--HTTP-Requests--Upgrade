
const Header = ()=>{

    return (
        <header className="header">
                <h1 className="header__heading-1">Rick and Morty</h1>
                <h2 className="header__heading-2">Choose a trading Card</h2>
                <input className="header__checkbox" type="checkbox" />
                <h5 className="header__checkboxTitle">Don't uncheck</h5>
        </header>
    )

}

export default Header;