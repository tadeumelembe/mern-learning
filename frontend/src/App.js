import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Dashboard from "./Views/Dashboard";
import Login from "./Views/Login";
import Register from "./Views/Register";
import { ToastContainer } from 'react-toastify'
import { UseGlobalUser, UserContext } from './Context/UserContext';

import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [appLoading, setAppLoading] = useState(true)
  const userData = UseGlobalUser();

  useEffect(() => {
    let restoreUser = localStorage.getItem('userData');

    if (restoreUser !== null && restoreUser !== undefined) {
      restoreUser = JSON.parse(restoreUser)
      userData.userContextActions({
        type: 'restoreUser',
        payload: {
          ...userData.userContextState,
          name: restoreUser.name,
          surname: restoreUser.surname ? restoreUser.surname : null,
          email: restoreUser.email,
          id: restoreUser.id,
          token: restoreUser.token
        }
      })

    }
    setAppLoading(false)

  }, [])


  return (
    <>
      <div className='container'>
        {appLoading ? (
          <h1>Loading</h1>
        ) :
          (

            <UserContext.Provider value={userData}>

              <Header />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={

                  <Register />

                } />
              </Routes>
              <ToastContainer />

            </UserContext.Provider>

          )}

      </div>
    </>
  );
}

export default App;
