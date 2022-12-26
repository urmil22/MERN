import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa"
import { register, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner"

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
      e.preventDefault()

      if(password !== password2) {
        toast.error('Passwords do not match')
      } else {
        const userData = {
            name, email, password
        }

        dispatch(register(userData))
      }
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
          <h1>
            <FaUser /> Register
          </h1>
          <p>Please create an account</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type='text' 
                    id="name" 
                    name="name" 
                    value={name} 
                    onChange={onChange}
                    className="form-control" 
                    placeholder="Enter your name" />
                </div>

                <div className="form-group">
                    <input type='email' 
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={onChange}
                    className="form-control" 
                    placeholder="Enter your email" />
                </div>

                <div className="form-group">
                    <input type='password' 
                    id="password" 
                    name="password" 
                    value={password} 
                    onChange={onChange}
                    className="form-control" 
                    placeholder="Enter your password" />
                </div>

                <div className="form-group">
                    <input type='password' 
                    id="password2" 
                    name="password2" 
                    value={password2} 
                    onChange={onChange}
                    className="form-control" 
                    placeholder="Confirm password" />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-block">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register