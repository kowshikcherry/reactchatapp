import React from 'react'
import './App.css'
import { useState } from 'react'

const EachMessage = (props) => {
    const [count,setCount]=useState(0)
    const {i}=props
    // console.log(i)
    const colors = ["lightblue", "lightgreen", "lightcoral", "lavender", "peachpuff"];


  return (
    <li className='lidiv'>
        <h3 style={{backgroundColor: colors[i.randomNumber]}}  className='singleWord'>
            {i.randomUser[0]}
        </h3>
        <div>
            <div className='dateanduserDiv'>
                <h4 className='headingofrandomuser'>{i.randomUser}</h4>
                <p>{i.currentTime}</p>
            </div>
            <div className='messageofuserDiv'>
                {i.messege}
            </div>
            <button onClick={()=>setCount(count+1)}>like{count}</button>
        </div>
    </li>
  )
}

export default EachMessage

/*

<h1>{i.randomUser}</h1>
        <p>{i.messege}</p>
*/