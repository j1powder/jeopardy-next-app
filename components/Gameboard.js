'use client'

import React,{Fragment, useEffect, useContext} from 'react'
import Question from './Question'
import { AuthContext } from '@/context/AuthContext'
import {useRouter} from 'next/navigation'



const Gameboard = (props) => {
const {currentUser} = useContext(AuthContext);
const router = useRouter();

useEffect(()=>{
  currentUser ? router.push('/gameboard')
  : router.push('/')
},[])
  
  return <Fragment>
    <Question docsData={props.questions} functionRan={props.functionRan} />
  </Fragment>
}

export default Gameboard