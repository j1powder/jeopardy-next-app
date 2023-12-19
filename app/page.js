'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Gameboard from '@/components/Gameboard'
import Question from '@/components/Question'
import Modal from 'react-bootstrap/Modal'
import {useState, useEffect} from 'react'
import { projectFirestore } from '@/firebaseConfig'
import {collection, doc, getDocs } from 'firebase/firestore';

import classes from '../components/Gameboard.module.css'

const Home = () => {
  const [show, setShow] = useState(false);
  const [docsData, setDocsData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = await getDocs(collection(projectFirestore,'jeopardy-questions')); // Replace 'yourCollection' with the actual name of your Firestore collection
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
    
  return ( 
    <div>
    <main > 
      <Container >
        <Row>
          <Col xs={12}>
          <h1 style={{textAlign: "center"}} className={classes.header}>This Is Jeopardy</h1>
          <br/>
          <hr/>
          <h1 style={{textAlign: "center"}} >Todays Categories</h1>
          
          </Col>
        </Row>

          <Gameboard questions={docsData && docsData}/>
        <br/>
        <br/>
      </Container>
    </main>



</div> 

  )
}

export default Home;
