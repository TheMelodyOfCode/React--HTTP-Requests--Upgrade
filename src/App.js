
import * as React from 'react'

import Home from "./pages/home.component";
import Header from "./components/header/header.component";


function App() {

  const [mountApp, setMountApp] = React.useState(true)
  if (mountApp) {
    return (
      <>
          <Header mountApp={mountApp} setMountApp={setMountApp} />
          <Home />
      </>
    );
  } else {
    return (
      <Header mountApp={mountApp} setMountApp={setMountApp} />
    )
  }

}

export default App;
