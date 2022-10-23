import { createContext, useState } from "react";

const ShowContext = createContext();

export const Show = ({children}) => {
    const [ IsLoggedIn, setLoggedIn ] = useState(false);
    // function setFlag(value){
    //     setLoggedIn(value);
    // }
    return (
        <ShowContext.Provider value = {[
            IsLoggedIn, setLoggedIn
        ]}>
        {children}
        </ShowContext.Provider>
    );
}

export default ShowContext;