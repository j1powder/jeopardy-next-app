


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Gameboard from '@/components/Gameboard'


import classes from '../components/Gameboard.module.css'

const HomePage = (props) => {
    
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

          <Gameboard questions={props.questions && props.questions}/>
        <br/>
        <br/>
      </Container>
    </main>



</div> 

  )
}

export default HomePage;