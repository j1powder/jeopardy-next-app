'use client'


import { AuthContext } from '@/context/AuthContext';
import Form from 'react-bootstrap/Form';
import {Fragment, useContext, useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './Gameboard.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const SignIn = () => {
 
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const {currentUser, signIn } = useContext(AuthContext);
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
    }
  };


 return <Fragment>
                <Card className={classes.signincard}>
                <Form onSubmit={handleLogin} >
                    <Form.Group>
                        <Form.Label >Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br/>
                        <Form.Label >Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                        <br/>
                        <Button variant="light" type="submit">Sign In</Button>
                    </Form.Group>
                </Form>
                <br/>
                <h4 style={{color:"white"}}>Never played before?</h4>
                <Link href="/register"><Button variant="light">Register here</Button></Link>
                </Card>
  </Fragment>
}

export default SignIn;