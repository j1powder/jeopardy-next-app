import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Register from '@/components/Register';
import classes from '../../components/Gameboard.module.css'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'


const RegisterPage = () => {
  return <Container style={{
    paddingTop: "6rem"
  }}>
    <Row>
      <Col sm={12}>
        <Link href="/"><Button>Back to Sign In</Button></Link>
      <h1 style={{textAlign: "center"}} className={classes.header}>This Is Jeopardy</h1>
        <hr/>
        <h3>Welcome to the Registration Page!!</h3>
        <h4>We are excited to have you join!</h4>
        <br/>
        <Register />
      </Col>
    </Row>
  </Container>
}

export default RegisterPage;