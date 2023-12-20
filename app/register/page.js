import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Register from '@/components/Register';
import classes from '../../components/Gameboard.module.css'


const RegisterPage = () => {
  return <Container style={{
    paddingTop: "6rem"
  }}>
    <Row>
      <Col sm={12}>
      <h1 style={{textAlign: "center"}} className={classes.header}>This Is Jeopardy</h1>
        <hr/>
        <h3>This is the Register Page</h3>
        <br/>
        <Register />
      </Col>
    </Row>
  </Container>
}

export default RegisterPage;