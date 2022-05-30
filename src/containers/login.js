import { auth } from '../services/firebase'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'

const Login = () => {

    const history = useHistory();

    var [loginFormState, setLoginFormState] = useState({
        email: '',
        password: ''
    })

    const formSubmitHandler = event => {
        event.preventDefault()

        auth.signInWithEmailAndPassword(loginFormState.email, loginFormState.password)
            .then(user => { user ? history.push('/admin') : alert("Login Unsuccessful")})
            .catch(err => console.log(err))
    }

    const handleInputChange = event => {
        event.preventDefault()

        setLoginFormState({
            ...loginFormState,
            [event.target.name] : event.target.value
        })
    }

    return ( 
        <div>
            <Navbar />
            
            <div className="container">
                <form className="p-5" onSubmit={formSubmitHandler} style={{ backgroundColor: 'lightgrey' }}>
                    <h1 className="py-1" style={{ fontWeight: '800', textAlign: 'center' }}>LOGIN</h1>

                    <div className="row py-3">
                        <div className="col-lg-6 col-12">
                            <input type="email" name="email" onChange={handleInputChange}
                                style={{ borderRadius: '0', border: 'none' }}
                                className="form-control" placeholder="Email" />
                        </div>
                        <div className="col-lg-6 col-12 pt-lg-0 pt-4">
                            <input type="password" name="password" onChange={handleInputChange}
                                style={{ borderRadius: '0', border: 'none' }}
                                className="form-control" placeholder="Password" />
                        </div>
                    </div>
                    
                    <center>
                        <button className="btn btn-outline-secondary mt-3" style={{ borderRadius: '0' }}>SUBMIT</button>
                    </center>
                </form>
            </div>

            <Footer />
        </div>
    )
}
 
export default Login