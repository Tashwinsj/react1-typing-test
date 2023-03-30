import React , {useState} from 'react'
import './App.css';
import data from "./data"

function App() {
  //word is the state defined for taking in the input of the textbox
  const [word , setword] = useState("")  ;
  //count is the state which stores the count of words entered 
  const [count , setcount] = useState(0) ;
  //coorectcount is the state which stores only the correct words that are entered
  const [correctcount , setcorrectcount] = useState(0) ;
  //time is the state which keeps account of the time elapsed
  const [time , settime ] = useState(60) ; 
  //timer state decides wheather the time should be running or not 
  const [timer , settimer] = useState(false) ;

  //these are the set of words that are need to be typed  
  const firstset = data.firstsetfirstset ; 
  const nextset = data.nextset ; 
  
  //wordset state keeps track of the words to be displayed
  const [wordset , setwordset ]  =useState(firstset) ; 
  const arr = wordset.map(w => (<div className='wblock' style={w === wordset[count]?{backgroundColor: "grey"} : {backgroundColor: "white"}}>{` ${w}`}</div>)) ;
  //handler funtion recieves event e and listens to whatever is typed in the textarea
  function handler(e ){
    const value = e.target.value ;  
     if(value.indexOf(' ') >= 0){
       //hitting space starts the timer
       if(value === " "){
         settimer(true); 
       }
       //checking if the word entered is correct or not  
       if(value === wordset[count]){
         setcorrectcount(prev => prev +1)  ;
       }
       //incrementing the count state
       setcount(prev => prev +1 ) ;
        setword("") ;
     }
     //if no space is found then the value to set to the word and no changes are made 
     else{
      setword(value) ;
     }
     
  }
  //logic to change the wordset when its completed typing and want new words 
  if( count > 51){
    
    setwordset(nextset) ;
    setcount(0) ;
  }
  
//react usestate hook is used to handle the timer for the application 
  React.useEffect(() => {
     if( time > 0 && timer){
        setTimeout(() => {
            settime(time => time - 1)
        }, 1000)  }
     
},[time ,timer ])

//reset funtion used to set all the states to initial values and start the type test again
  function reset(){
     setword("") ;
     setcorrectcount(0) ; 
     setcount(0) ;
     settime(60) ;
     settimer(false) ; 
     setwordset(firstset) ;
  }
  //the result section is conditionally renderd at the end of the test duration i.e 60sec
   const speed =  (<div className="result"> {time === 0 ? `${correctcount -1}`: " "} wpm</div>)

  
  return (
    <div className ="bod">
     <h1>How fast do you type?</h1>
     <h3>Press "space" key to start !</h3>
     <div className="wordsblock">{time !== 0 ? arr : speed}</div>
     <div className="flxbox" >
     <textarea className="inp" value={word} onChange={handler} />
    
     <button className="btn" onClick={reset} >
     <i class="fa-solid fa-arrows-rotate fa-2xl" ></i>
     </button>
     <div className='timebox'>{`${time}`}</div>
     </div>
      
    </div>
 );
}

export default App;
