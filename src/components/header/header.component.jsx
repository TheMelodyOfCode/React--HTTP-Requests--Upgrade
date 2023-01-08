
const Header = ({mountApp, setMountApp})=>{
    
    return (
        <header className="header">
                
                {mountApp ? 
                <>
                <h1 className="header__heading-1">Rick and Morty</h1> 
                <h2 className="header__heading-2">Choose a trading Card</h2> 
                </>
                : 
                <>
                <h1 className="header__heading-1">Ooooops</h1> 
                <h2 className="header__heading-2">Check the box again</h2> 
                </>
                }  
                <input 
                className="header__checkbox" 
                type="checkbox" 
                checked={mountApp}
                onChange={e => setMountApp(e.target.checked)}
                />
                <h5 className="header__checkboxTitle"> Don't uncheck the box! </h5>
        </header>
    )

}

export default Header;