import SignIn from '@/components/SignIn';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import classes from '../components/Gameboard.module.css'

const Home = async () => {



    
  return <div>
            <Container style={{
              paddingTop: "6rem"
            }}>
              <Row>
                <Col sm={12}>
                <h1 style={{textAlign: "center"}} className={classes.header}>This Is Jeopardy</h1>
                  <hr/>
                  <h3>Sign in below to start a new game</h3>
                  <br/>
                  <SignIn/>
                </Col>
              </Row>
            </Container>
        </div>

  
}

export default Home;
