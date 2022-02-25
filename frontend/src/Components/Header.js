import { useContext, useState } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {useNavigate, Link} from 'react-router-dom'
import {UserContext} from '../Context/UserContext'

function Header() {
    const navigate = useNavigate()

    const { userContextState, userContextActions } = useContext(UserContext)
  
    return (
      <header className='header'>
        <div className='logo'>
          <Link to='/'>GoalSetter</Link>
        </div>
        <ul>
          {userContextState.token ? (
            <li>
              <button className='btn' onClick={()=> userContextActions({type:'logOut'})}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    )
  }
  
  export default Header