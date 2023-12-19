'use client'

import React,{Fragment} from 'react'
import Question from './Question'




const Gameboard = (props) => {


  
  return <Fragment>
    <Question docsData={props.questions} />
  </Fragment>
}

export default Gameboard