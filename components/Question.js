'use client'

import React,{Fragment, useEffect, useState} from 'react'
import classes from './Gameboard.module.css'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { projectFirestore } from '@/firebaseConfig'
import {doc, updateDoc, setDoc} from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import { useRouter } from 'next/navigation'




const Question = (props) => {
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState('');
  const [total, setTotal] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [answers, setAnswers] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [questionId, setQuestionId] = useState('')
  const router = useRouter();

 console.log(selectedAnswer, questionId)

const submitAnswerHandler = async (e) => {
  e.preventDefault()
  const ref = doc(projectFirestore, 'jeopardy-questions', `${questionId}`);
  if(total === 200){
    try{
      console.log(questionId)
       await setDoc(ref,{ question1: {selectedAnswer: selectedAnswer}
        
      },{merge: true}) 
      console.log('successfully updated document');
      setShow(false)
      router.refresh();
        }catch(err){
          console.log(err, "something went wrong")
        }
  }
  if(total === 400){
    try{
      console.log(questionId)
       await setDoc(ref,{ question2: {selectedAnswer: selectedAnswer}
        
      },{merge: true}) 
      console.log('successfully updated document');
        }catch(err){
          console.log(err, "something went wrong")
        }
  }
  if(total === 600){
    try{
      console.log(questionId)
       await setDoc(ref,{ question3: {selectedAnswer: selectedAnswer}
        
      },{merge: true}) 
      console.log('successfully updated document');
        }catch(err){
          console.log(err, "something went wrong")
        }
  }
  if(total === 800){
    try{
      console.log(questionId)
       await setDoc(ref,{ question4: {selectedAnswer: selectedAnswer}
        
      },{merge: true}) 
      console.log('successfully updated document');
        }catch(err){
          console.log(err, "something went wrong")
        }
  }


}


  return <Fragment>
    <Row>
    {props.docsData && props.docsData.map((data)=>{
      return  <Col sm={3} key={Math.random()}>
                  <Card className={classes.border} >
                  <b>{data.id}</b>
                  </Card>
                  <Card 
                  className={data.question1.selectedAnswer === null ? classes.biggerFont : classes.done} 
                  onClick={(e)=> {
                                console.log(data)
                                 setQuestionId(data.id) 
                                 setQuestionContent(data.question1.questionText);
                                 setAnswers(data.question1.answers);
                                 setCategory(data.id);
                                 setTotal(data.question1.amount);
                                 setShow(true);}}>
                  <b>{data.question1.amount}</b>
                  </Card>

                  <Card 
                    className={classes.biggerFont} 
                    onClick={(e)=> { 
                                    setQuestionId(data.id)
                                    setQuestionContent(data.question2.questionText);
                                    setAnswers(data.question2.answers);
                                    setCategory(data.id);
                                    setTotal(data.question2.amount);
                                    setShow(true);}}>
                  <b>{data.question2.amount}</b>
                  </Card>
                  <Card 
                      className={classes.biggerFont} 
                      onClick={(e)=> {
                        setQuestionId(data.id) 
                        setQuestionContent(data.question3.questionText);
                        setAnswers(data.question3.answers);
                        setCategory(data.id);
                        setTotal(data.question3.amount);
                        setShow(true);}}>
                  <b>{data.question3.amount}</b>
                  </Card>
                  <Card className={classes.biggerFont} 
                        onClick={(e)=> {
                          setQuestionId(data.id)
                          setQuestionContent(data.question4.questionText);
                          setAnswers(data.question4.answers);
                          setCategory(data.id);
                          setTotal(data.question4.amount);
                          setShow(true)}}>
                  <b>{data.question4.amount}</b>
                  </Card>
              </Col>
    })}

</Row>


<Modal show={show} onHide={()=> setShow(false)} centered size="lg">
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

</Fragment>
}

export default Question;