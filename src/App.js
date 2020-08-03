import React, {useState, useEffect} from "react";
import {BrowserRouter} from 'react-router-dom';
import Private from "./components/Private";
import Public from "./components/Public";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(()=>{
    const token = localStorage.getItem("token");
    token &&  setIsAuth(true);
  }, []);
  
  return <BrowserRouter>
          {isAuth ?
            <Private setIsAuth={setIsAuth} /> 
          : 
            <Public setIsAuth={setIsAuth} />
          }</BrowserRouter>;
};

export default App;