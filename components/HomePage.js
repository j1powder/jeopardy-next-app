
'use client'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Gameboard from '@/components/Gameboard'
import {useContext} from 'react';
import { AuthContext } from '@/context/AuthContext'
import {useRouter} from 'next/navigation'
import { projectFirestore } from '@/firebaseConfig'
import {doc, updateDoc, setDoc} from 'firebase/firestore'


import classes from '../components/Gameboard.module.css'

const HomePage = (props) => {
const {currentUser, signOutUser} = useContext(AuthContext);
const router = useRouter();

const signOutHandler = () =>{
  router.push('/');
  signOutUser();
  
}

const clearAllDataHandler = async () => {
  const ref1 = doc(projectFirestore, 'jeopardy-questions', 'Arc Flash');
  const ref2 = doc(projectFirestore, 'jeopardy-questions', 'Bloodborne Pathogens');
  const ref3 = doc(projectFirestore, 'jeopardy-questions', 'Fall Protection');
  const ref4 = doc(projectFirestore, 'jeopardy-questions', 'Hazard Communication');
  try{
    await setDoc(ref1,{question1: {selectedAnswer:null}, question2: {selectedAnswer:null}, question3: {selectedAnswer: null}, question4: {selectedAnswer: null}}, {merge: true});
    await setDoc(ref2,{question1: {selectedAnswer:null}, question2: {selectedAnswer:null}, question3: {selectedAnswer: null}, question4: {selectedAnswer: null}}, {merge: true});
    await setDoc(ref3,{question1: {selectedAnswer:null}, question3: {selectedAnswer:null}, question3: {selectedAnswer: null}, question4: {selectedAnswer: null}}, {merge: true});
    await setDoc(ref4,{question1: {selectedAnswer:null}, question4: {selectedAnswer:null}, question3: {selectedAnswer: null}, question4: {selectedAnswer: null}}, {merge: true});
    console.log('updated doc successfully');
  }catch(err){
    console.log(err, "something went wrong");
  }

}
    
  return ( 
    <div>
    <main > 
      <Container >
        <Row>
          <Col xs={12}>
          <h1 style={{textAlign: "center"}} className={classes.header}>This Is Jeopardy</h1> 
          <Button onClick={signOutHandler}>Sign Out</Button>
          <Button style={{float: "right"}} onClick={clearAllDataHandler}>Start Over</Button>
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