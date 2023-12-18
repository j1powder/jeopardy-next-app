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

const Home = () => {
  const [show, setShow] = useState(false);
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
  
console.log(docsData)

  const topics = ['Fall Protection', 'Aerial Lifts', 'First Aid', 'HazCom']
  
  
  return ( 
    <div>
    <main > 
      <Container >
        <Row>
          <Col xs={12}>
          <h3>My New App</h3>
          <br/>
          <hr/>

          
          </Col>
        </Row>
        <Row>
        {topics.map((topic)=>{
            return <Col xs={3} key={topic}><Question Total={topic} /><Gameboard category={topic} questions={docsData && docsData}/></Col>
          })}
          
        </Row>
      </Container>
    </main>



</div> 

  )
}

export default Home;
