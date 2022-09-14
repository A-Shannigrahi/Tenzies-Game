import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App()
{

  function allNewDice() {
    const diceArray = []
    for (let i = 1; i <=10; i++) {
        diceArray.push({value:Math.floor(Math.random() * (7-1)+1),isHeld:false,id:nanoid()})
    }
    return diceArray
}


const [dieArray,setDieArray]=React.useState(allNewDice())
const dieMap=dieArray.map(val=>{return <Die value={val.value} key={val.id} id={val.id} isHeld={val.isHeld} hold={Hold}/>})


 function handleRollDice() {
        
  setDieArray(prev => prev.map(die=> {return die.isHeld===true ? die:{
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      } }))
}


function Hold(id)
{
  setDieArray(prev=> {
    const newArray=[]
    for (let i=0;i<prev.length;i++)
    {
      const dice=prev[i]
      if(dice.id==id)
      {
        const newdice={...dice,isHeld:!dice.isHeld}
        newArray.push(newdice)
      }
    else{
      newArray.push(dice)
    }
    }
    return newArray   
  } )
}

const [tenzies,setTenzies]=React.useState(false)



React.useEffect(() => {
  const val=dieArray[0].value
  let flag1=1;
  let flag2=1;
  for (let i=0;i<dieArray.length;i++)
  {
      if (dieArray[i].isHeld==false)
      {  
         
          flag1=0;
          break;
       }
  }
for (let i=0;i<dieArray.length;i++)
 {
      if (dieArray[i].value!=val)
      {   
          flag2=0;
          break;
      }
  }
  console.log(flag1,flag2)
  if (flag1==1 && flag2==1)
  {
    console.log("Victory")
    setTenzies(true)
  }
  else{
    console.log("no victory")
  }
  
}, [dieArray])



function handleReset()
    {
        setDieArray(allNewDice())
    }




  return (
  <div className="main">
    <div className="text">
      <h1>Tenzies Game</h1>
     <p>Roll the dice until all the values are the same! Click the box to hold the value</p>
    
    </div>
    <div className="grid">
     {dieMap}

    </div>

    <button className="roll" onClick={tenzies? handleReset: handleRollDice}>{tenzies?"Reset":"Roll"}</button>

    {tenzies && <Confetti />}
  </div>
  )
}