import { useContext, useEffect, useState } from "react"

import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "axios"

import { UserContext } from "../Context/UserContext"

export default function Login() {
    const {userContextState, userContextActions} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const navigate = useNavigate()

    useEffect(() => {
    
        if (userContextState.token) {
            navigate('/')
        }
    
      }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error('Fill all the fields');
            return
        }

        loginFetch()
    }

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const loginFetch = () => {
        const userData = {
            email: email,
            password: password
        }
        setIsLoading(true)
        axios.post('/api/users/login', userData)
            .then(response => {
                if (response.data) {
    
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
                    setIsLoading(false)
                    navigate('/')
    
                }

            }).catch(err => {
                setIsLoading(false)

                if (err.response) {
                    toast.error(err.response.data.message);
                }else{
                    toast.error('Something went wrog! Please try again');
                }
                console.log(err.response)
            })

    }


    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Login
                </h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
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
                            <button type='submit' className='btn btn-block'>
                                {isLoading ? 'Loading' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}