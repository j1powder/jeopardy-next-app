'use client'

import React,{Fragment, useEffect, useState} from 'react'
import classes from './Gameboard.module.css'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'



const Question = (props) => {
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState();
  const [total, setTotal] = useState();
  const [questionContent, setQuestionContent] = useState();
  const [answers, setAnswers] = useState();


  return <Fragment>
    <Row>
    {props.docsData && props.docsData.map((data)=>{
      return  <Col sm={3} key={Math.random()}>
                  <Card className={classes.border} >
                  <b>{data.id}</b>
                  </Card>
                  <Card 
                  className={classes.biggerFont} 
                  onClick={(e)=> {
                                  
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
                         
                        setQuestionContent(data.question3.questionText);
                        setAnswers(data.question3.answers);
                        setCategory(data.id);
                        setTotal(data.question3.amount);
                        setShow(true);}}>
                  <b>{data.question3.amount}</b>
                  </Card>
                  <Card className={classes.biggerFont} 
                        onClick={(e)=> {
                           
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
    {answers && answers.map((answer)=>{
      return <div key={answer}><input type="radio" style={{margin:".3rem"}}></input><label>{answer}</label></div>
    })}
</Modal.Body>
<Modal.Footer>

</Modal.Footer>
</Modal>

</Fragment>
}

export default Question;