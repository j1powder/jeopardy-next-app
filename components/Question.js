'use client'

import React,{Fragment, useEffect, useState} from 'react'
import classes from './Gameboard.module.css'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import { projectFirestore } from '@/firebaseConfig'
import {doc, getDocs, collection} from 'firebase/firestore' 


const Question = (props) => {
  const [show, setShow] = useState(false)
  const [topic, setTopic] = useState();
  const [money, setMoney] = useState();
  const [docsData, setDocsData] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = await getDocs(collection(projectFirestore,'questions')); // Replace 'yourCollection' with the actual name of your Firestore collection
        const snapshot = collectionRef;

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDocsData(data);
      } catch (error) {
        console.error('Error fetching Firestore collection:', error);
      }
    };

    fetchData();
  }, []);

  let thisQuestion = [];


  

  return <Fragment>
            <Card className={classes.border} onClick={(e)=> {setShow(true); setMoney(e.target.innerText); setTopic(props.category); console.log(props.category, e.target.innerText)}}>
              <b>{props.Total}</b>
            </Card>

<Modal show={show} onHide={()=> setShow(false)} centered size='md'>
<Modal.Header closeButton>
  <Modal.Title>Woohoo, this is {topic} for ${money}</Modal.Title>
</Modal.Header>
<Modal.Body>

</Modal.Body>
<Modal.Footer>

</Modal.Footer>
</Modal>

        </Fragment>
}

export default Question;