import { createContext, useState, useEffect } from "react";

const AuthContext = createContext() 

export function AuthProvider({children}){
    const [user, setUser] = useState([])

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext