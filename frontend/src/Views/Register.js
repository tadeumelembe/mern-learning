import { useReducer, useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'

const initialUserState = {
    name: '',
    surname: '',
    email: '',
    password: '',
    password2: '',
}

const registerReducer = (state, action) => {

    switch (action.type) {
        case 'setData': {
            return {
                ...state,
                [action.fieldName]: action.payload,
            };
        }
        default:
            return action.payload

    }
}

function Register() {
    const { userContextState, userContextActions } = useContext(UserContext)

    const [formData, dispatch] = useReducer(registerReducer, initialUserState)
    const { name, surname, email, password, password2 } = formData

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
    
        if (userContextState.token) {
            navigate('/')
        }
    
      }, [])

    const onChange = (e) => {
        dispatch({
            type: 'setData',
            fieldName: e.target.name,
            payload: e.target.value,
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!name || !surname || !password || !email) {
            toast.error('Fill all the fields');
            return
        }

        if (password !== password2) {
            toast.error('Passwords do not match!');
            return
        }

        fetchRegister()
    }

    const fetchRegister = async () => {

        const userData = {
            name: name,
            surname: surname,
            email: email,
            password: password
        }

        try {
            setIsLoading(true)
            const response = await axios.post('/api/users/register', userData)


            if (response.data) {
                console.log(response.data)

                userContextActions({
                    type: 'setUser',
                    payload: {
                        ...userContextState,
                        name: response.data.name,
                        surname: response.data.surname ? response.data.surname : null,
                        email: response.data.email,
                        id: response.data.id,
                        token: response.data.token
                    }
                })

            }
            setIsLoading(false)

            navigate('/')

        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            }

            setIsLoading(false)

        }

    }


    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            placeholder='Enter your name'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='surname'
                            name='surname'
                            value={surname}
                            placeholder='Enter your last name'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
                            placeholder='Confirm password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>
                            {isLoading ? 'Loading' : 'Submit'}
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register