
'use client'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Gameboard from '@/components/Gameboard'
import {useContext} from 'react';
import { AuthContext } from '@/context/AuthContext'
import {useRouter} from 'next/navigation'


import classes from '../components/Gameboard.module.css'

const HomePage = (props) => {
const {currentUser, signOutUser} = useContext(AuthContext);
const router = useRouter();

const signOutHandler = () =>{
  router.push('/');
  signOutUser();
  
}
    
  return ( 
    <div>
    <main > 
      <Container >
        <Row>
          <Col xs={12}>
          <h1 style={{textAlign: "center"}} className={classes.header}>This Is Jeopardy</h1> <Button onClick={signOutHandler}>Sign Out</Button>
          <br/>
          <hr/>
          <h1 style={{textAlign: "center"}} >Hi {currentUser && currentUser.displayName }, Todays Categories are:</h1>
          
          </Col>
        </Row>

          <Gameboard questions={props.questions && props.questions}/>
        <br/>
        <br/>
      </Container>
    </main>



</div> 

  )
}

export default HomePage;