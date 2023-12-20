'use client'


import { AuthContext } from '@/context/AuthContext';
import Form from 'react-bootstrap/Form';
import {Fragment, useContext, useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './Gameboard.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const Register = () => {
 const [displayName ,setDisplayName] = useState('')
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const {currentUser, signUp } = useContext(AuthContext);
 const router = useRouter();

 useEffect(()=>{
  !currentUser ? router.push('/register')
  : router.push('/gameboard')
},[]);


 const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp(displayName, email, password);
      console.log('created user:', currentUser);
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
                <Form onSubmit={handleRegister} >
                    <Form.Group>
                        <Form.Label >Display Name</Form.Label>
                        <Form.Control type="text" placeholder="Your Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                        <Form.Label >Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br/>
                        <Form.Label >Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                        <br/>
                        <Button variant="light" type="submit">Register</Button>
                    </Form.Group>
                </Form>
                <br/>

                </Card>
  </Fragment>
}

export default Register;