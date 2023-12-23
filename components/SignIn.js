'use client'


import { AuthContext } from '@/context/AuthContext';
import Form from 'react-bootstrap/Form';
import {Fragment, useContext, useState, useEffect, useRef} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './Gameboard.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';



const SignIn = () => {
 
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const {currentUser, signIn } = useContext(AuthContext);
 const [show, setShow] = useState(false)
 const emailRef = useRef();
 const passwordRef = useRef();
 const router = useRouter();

 useEffect(()=>{
  !currentUser ? router.push('/')
  : router.push('/gameboard')
},[])

 const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      console.log('Logged in user:', currentUser);
      // Redirect or handle successful login
      router.push('/gameboard')
      setEmail('');
      setPassword('');
      //setShow(false)
      //router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error.message);
      // Handle error
      //alert('It Looks like there was an issue logging in')
      setShow(true)
      emailRef.current.style.border = "solid red 2px"
      passwordRef.current.style.border = "solid red 2px"
    }
  };


 return <Fragment>
                <Card className={classes.signincard}>
                <Form onSubmit={handleLogin} >
                    <Form.Group>
                        <Form.Label >Email</Form.Label>
                        <Form.Control ref={emailRef} type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br/>
                        <Form.Label >Password</Form.Label>
                        <Form.Control ref={passwordRef} type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                        <br/>
                        <Button variant="light" type="submit">Sign In</Button>
                    </Form.Group>
                </Form>
                <br/>
                <h4 style={{color:"white"}}>Never played before?</h4>
                <Link href="/register"><Button variant="light">Register here</Button></Link>
                </Card>

        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={3500} autohide bg="warning">
          <Toast.Header>

            <strong className="me-auto">Login Error</strong>
            <small className="text-muted"></small>
          </Toast.Header>
          <Toast.Body>You might need to register first by clicking <b>register here</b> below</Toast.Body>
        </Toast>
      </ToastContainer>
  </Fragment>
}

export default SignIn;