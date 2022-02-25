import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});

const UseGlobalUser = () => {
const navidate = useNavigate()
    const [userContextState, setUserContextState] = useState(
        {
            name: '',
            surname: '',
            id: '',
            token: '',
            isLogged: false
        }
    )

    const signOut = (payload) => {
        try {
            localStorage.removeItem("userData", JSON.stringify(payload));
            setUserContextState({
                name: '',
                surname: '',
                id: '',
                token: '',
                isLogged: false
            })

            return navidate('/login');
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const userContextActions = (actions) => {
        const { type, payload } = actions;

        switch (type) {
            case 'setUser': {
                localStorage.setItem("userData", JSON.stringify(payload));
                return setUserContextState(payload);
            }
            case 'restoreUser':
                return setUserContextState(payload)
            case 'logOut':
                return signOut()
            default:
                return userContextState;
        }
    }

    return { userContextState, userContextActions }
}

export {
    UseGlobalUser,
    UserContext
}