import React,{Fragment} from 'react'
import Question from './Question'

const amounts = [200, 400, 800, 1000];


const Gameboard = (props) => {


  return <Fragment>
    {amounts.map((amount)=>{
      return <Question key={amount} Total={amount} style={{display: "inline", margin: "1rem"}} category={props.category}/>
    })}
        
  </Fragment>
}

export default Gameboard