import { useState, useEffect } from "react"
import '../styles/form.css'
import {useMutation} from '@apollo/client'
import  {SIGN_IN}  from './quaries';
import {SIGNUP} from './quaries'

export default function Form ({setUser}) {
    const [sign, setSign] = useState(true)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [signIn, signInResult] = useMutation(SIGN_IN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
            setLoading(false)
        }, 
    })

    const [signUp, signUpResult] = useMutation(SIGNUP, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
            setLoading(false)
        }
    })

    const signInSubmit = (event) =>{
        event.preventDefault()
        signIn({ variables: {username, password}}) 
    }

    const signUpSubmit = (event) =>{
        event.preventDefault()
        signUp({ variables: {name, username, password}}) 
    }

    useEffect(() => {
        if(signInResult.data){
            setUser(signInResult.data.signIn.username)
        }
    },[signInResult])


    useEffect(() => {
        if(signUpResult.data){
            setUser(signUpResult.data.signUp.username)
        }
    },[signUpResult])

    useEffect(() =>{
        if(signInResult.loading){
            setLoading(true)
        }
        if(signUpResult.loading){
            setLoading(true)
        }
    }, [signInResult, signUpResult])
 
    return(
        <div className="form">
            <h1>
                Chatbot
            </h1>
            <form action="">
                <h4 className="error">{error}</h4>
                <div className="toggleForm">
                   <a href="" onClick={(e) => {e.preventDefault(); setSign(true)}} className={sign? 'activeForm':''}>SignIn</a>/
                   <a href="" onClick={(e) => {e.preventDefault(); setSign(false)}} className={!sign? 'activeForm':''}>SignUp</a>
                </div>
              { sign && <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" pattern="^[A-Za-z0-9_]{1,15}$" required onChange={({target})=> setUserName(target.value)} value={username}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" onChange={({target})=> setPassword(target.value)} value={password}/>
                    <div className="formFoot">
                        <button onClick={signInSubmit}>Submit</button>
                       {loading && <div className="loading"></div>}
                    </div>
                </div>}
               {!sign && <div>
                    <label htmlFor="name" >Name</label>
                    <input type="text" id='name' required onChange={({target})=> setName(target.value)} value={name}/>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" pattern="^[A-Za-z0-9_]{1,15}$" required onChange={({target})=> setUserName(target.value)} value={username}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" onChange={({target})=> setPassword(target.value)} value={password}/>
                    <div className="formFoot">
                        <button onClick={signUpSubmit}>Submit</button>
                       {loading && <div className="loading"></div>}
                    </div>
                </div>}

            </form>
        </div>
    )
}