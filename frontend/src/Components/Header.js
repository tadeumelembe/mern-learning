import { useState } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {useNavigate, Link} from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    
    const { user} = useState(false)
  
  
    return (
      <header className='header'>
        <div className='logo'>
          <Link to='/'>GoalSetter</Link>
        </div>
        <ul>
          {user ? (
            <li>
              <button className='btn'>
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