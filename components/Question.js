'use client'

import React,{Fragment, useEffect, useState, useRef} from 'react'
import classes from './Gameboard.module.css'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { projectFirestore } from '@/firebaseConfig'
import {doc, updateDoc, setDoc, getDocs, collection} from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import { useRouter } from 'next/navigation'
import ReactAudioPlayer from 'react-audio-player'




const Question = (props) => {
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState('');
  const [total, setTotal] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [answers, setAnswers] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [questionId, setQuestionId] = useState('')
  const [showScore, setShowScore] = useState(false);
  const [myData, setMyData] = useState();
  const [score, setScore] = useState();
  const router = useRouter();
  const tune = useRef()

 
useEffect(()=>{
  let results=[];
  const fetchData = async () => {
  const querySnapshot = await getDocs(collection(projectFirestore, "jeopardy-questions"));
  querySnapshot.docs.map((doc) => {
    // doc.data() is never undefined for query doc snapshots
    results.push({id: doc.id, ...doc.data()});
  });
 
  setMyData(results);
}
fetchData()
  },[show, props.functionRan])  
 
 
const submitAnswerHandler = async (e) => {
  tune.current.pause();
  setShowScore(false)
  e.preventDefault()
  const ref = doc(projectFirestore, 'jeopardy-questions', `${questionId}`);
  
  if(total === 200){
    try{
      
       await setDoc(ref,{ question1: {selectedAnswer: selectedAnswer}
        
      },{merge: true}) 
      console.log('successfully updated document');
      setShow(false);
      
      router.refresh();
        }catch(err){
          console.log(err, "something went wrong")
        }
  }
  if(total === 400){
    try{
      
       await setDoc(ref,{ question2: {selectedAnswer: selectedAnswer}
        
      },{merge: true}) 
      console.log('successfully updated document');
      setShow(false);
      router.refresh();
        }catch(err){
          console.log(err, "something went wrong")
        }
  }
  if(total === 600){
    try{
      
       await setDoc(ref,{ question3: {selectedAnswer: selectedAnswer}
        
      },{merge: true}) 
      console.log('successfully updated document');
      setShow(false);
      router.refresh();
        }catch(err){
          console.log(err, "something went wrong")
        }
  }
  if(total === 800){
    try{
      
       await setDoc(ref,{ question4: {selectedAnswer: selectedAnswer}
        
      },{merge: true}) 
      console.log('successfully updated document');
      setShow(false);
      router.refresh();
        }catch(err){
          console.log(err, "something went wrong")
        }
  }


}


function playMusic(){
tune.current.load()
tune.current.play()
}


const finalScoreHandler = () => {
  if(myData){
    let row1 = myData.map((answer)=>{
      if(answer.question1.isCorrect === answer.question1.selectedAnswer){
        return true
      } else {
        return false
      }
    })
    let row2 = myData.map((answer)=>{
      if(answer.question2.isCorrect === answer.question2.selectedAnswer){
        return true
      } else {
        return false
      }
    })
    let row3 = myData.map((answer)=>{
      if(answer.question3.isCorrect === answer.question3.selectedAnswer){
        return true
      } else {
        return false
      }
    })
    let row4 = myData.map((answer)=>{
      if(answer.question4.isCorrect === answer.question4.selectedAnswer){
        return true
      } else {
        return false
      }
    })
  let totalAnswers = row1.concat(row2,row3,row4);
  let totalCorrect = totalAnswers.filter((answer)=> answer === true)
  let finalScore = (totalCorrect.length / totalAnswers.length) * 100

  setScore(finalScore);
  }
  setShowScore(true);
}



  return <Fragment>
    <Row>
    
 <audio id="music" ref={tune}>
  <source src="/jeopardytune.mp3"  />
</audio> 

    {myData && myData.map((data)=>{
      
      return  <Col sm={3} key={Math.random()}>

                  <Card className={classes.border}  >
                  <b>{data.id}</b>
                  </Card>
                  <Card 
                  className={data.question1.selectedAnswer === null ? classes.biggerFont : classes.done}
                  disabled={data.question1.selectedAnswer === null ? false : true} 
                  onClick={data.question1.selectedAnswer === null ? (e)=> {
                                 
                                 playMusic()
                                 setQuestionId(data.id) 
                                 setQuestionContent(data.question1.questionText);
                                 setAnswers(data.question1.answers);
                                 setCategory(data.id);
                                 setTotal(data.question1.amount);
                                 setShow(true);
                                 } : ()=>console.log('Already Answered This')}>
                  <b>{data.question1.amount}</b>
                  </Card>

                  <Card 
                    className={data.question2.selectedAnswer === null ? classes.biggerFont : classes.done}
                    disabled={data.question2.selectedAnswer === null ? false : true} 
                    onClick={data.question2.selectedAnswer === null ? (e)=> { 
                                    playMusic();
                                    setQuestionId(data.id)
                                    setQuestionContent(data.question2.questionText);
                                    setAnswers(data.question2.answers);
                                    setCategory(data.id);
                                    setTotal(data.question2.amount);
                                    setShow(true);} : ()=>console.log('Already Answered This') }>
                  <b>{data.question2.amount}</b>
                  </Card>
                  <Card 
                      className={data.question3.selectedAnswer === null ? classes.biggerFont : classes.done} 
                      disabled={data.question3.selectedAnswer === null ? false : true} 
                      onClick={data.question3.selectedAnswer === null ? (e)=> {
                        playMusic();
                        setQuestionId(data.id) 
                        setQuestionContent(data.question3.questionText);
                        setAnswers(data.question3.answers);
                        setCategory(data.id);
                        setTotal(data.question3.amount);
                        setShow(true);} : ()=>console.log('Already Answered This')}>
                  <b>{data.question3.amount}</b>
                  </Card>
                  <Card className={data.question4.selectedAnswer === null ? classes.biggerFont : classes.done} 
                        disabled={data.question4.selectedAnswer === null ? false : true}
                        onClick={data.question4.selectedAnswer === null ? (e)=> {
                          playMusic();
                          setQuestionId(data.id)
                          setQuestionContent(data.question4.questionText);
                          setAnswers(data.question4.answers);
                          setCategory(data.id);
                          setTotal(data.question4.amount);
                          setShow(true)}: ()=>console.log('Already Answered This')}>
                  <b>{data.question4.amount}</b>
                  </Card>
              </Col>
    })}

</Row>


<Modal show={show} onHide={()=> {setShow(false); tune.current.pause(); setShowScore(false)}} centered size="lg">
<Modal.Header closeButton>
  <Modal.Title>{category} for ${total}</Modal.Title>
</Modal.Header>
<Modal.Body style={{backgroundColor:"skyblue"}}>
  
    {questionContent}
    <br/>
    <br/>
    <Form>
    {answers && answers.map((answer)=>{
      return <div key={answer}>
        <Form.Check type="radio" style={{margin:".3rem"}} name="question" label={"What is: " + answer} onChange={(e)=>setSelectedAnswer(answer)}></Form.Check>   {/* <label>What is: {answer}</label> */}
        </div>

    })}
    <br/>
    <Button variant="light" type="submit" onClick={submitAnswerHandler}>Submit Answer</Button>
    </Form>
</Modal.Body>
<Modal.Footer>

</Modal.Footer>
</Modal>
<br/>
<Button onClick={finalScoreHandler}  style={{margin: "auto", display: 'block'}}>See How You Did</Button>
<p>note: this will not reflect an accurate score until all questions are answered</p>
<br/>
{showScore && <h3 style={{textAlign: "center"}}> You did Amazing!! <br/>{score.toFixed(2)}%</h3>}

</Fragment>
}

export default Question;