import React, { Suspense, useEffect, useState, useRef} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Idle } from './characters/Idle';
import { Wave } from './characters/Wave';
import { useApolloClient, useMutation, useQuery} from '@apollo/client'
import { Ajhit } from './characters/Ajhit';
import TextareaAutosize from 'react-textarea-autosize';
import { Ajwalk} from './characters/Ajwalk';
import { AjBackFlip } from './characters/Ajbackflip';
import { AjDance } from './characters/Ajdance';
import { AmyIdle } from './characters/Amyidle';
import { AmyWalk } from './characters/Amywalk';
import { AmyWave } from './characters/Amywave';
import { AmyDance } from './characters/Amydance';
import { Amybackflip } from './characters/Amybackflip';
import { AmyHit } from './characters/Amyhit';
import { RomeroIdle } from './characters/Romeroidle';
import { RomeroWalk } from './characters/Romerowalk';
import { RomeroWave } from './characters/Romerowave';
import { RomeroHit } from './characters/Romerohit';
import { RomeroDance } from './characters/Romerodance';
import { RomeroBackflip } from './characters/Romerobackflip';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import './App.css'


export default function App() {
   const [user, setUser] = useState(null)
   const [action, setAction] = useState('idle')
   const [character, setCharacter] = useState('aj')
   const [text, setText] = useState('')
   const [conversation, setConversation] = useState([])
   const [chatLoading, setChatLoading] = useState()
   const [reply, setReply] = useState('')
   const [walkTimer, setWalkTimer] = useState(0)
   const [menuOpen, setMenuOpen] = useState(false)
   const { speak, voices } = useSpeechSynthesis();
   const chatDown = useRef()
  
   const { listen, listening, stop } = useSpeechRecognition({
      onResult: (result) => {
        setText(result);
      },
    });
   const incoming = (data) => {
      setConversation(prev => prev.concat(data))
   }
   const message = async () =>{
      // Text({variables:{text, username:user, sender: true}})
      
      if(text.toLowerCase().split(' ').includes('hi') || text.toLowerCase().split(' ').includes('hello')){
         setAction('wave')
      }
      if(text.toLowerCase().split(' ').includes('backflip') || text.toLowerCase().split(' ').includes('stunt')){
         setAction('backflip')
      }
      if(text.toLowerCase().split(' ').includes('dance')){
         setAction('dance')
      }
     
      setText('')
      setChatLoading(true)
      const options = {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            'x-rapidapi-ua': 'RapidAPI-Playground',
            'X-RapidAPI-Key': 'a9a7e6fa0cmsha228832973ec466p122ff5jsn355295c88072',
            'X-RapidAPI-Host': 'harley-the-chatbot.p.rapidapi.com'
         },
         body: `{"client":"${'bamidele'}","bot":"harley","message":"${text}"}`
      };
      
      fetch('https://harley-the-chatbot.p.rapidapi.com/talk/bot', options)
         .then(response => response.json())
         .then(response => {
            setChatLoading(false)
            setReply(response.data.conversation.output)
            incoming({text: response.data.conversation.output, sender:false})
            chatDown.current.scrollIntoView({behavior: 'smooth'})
            Text({variables:{text:response.data.conversation.output, username:user, sender: false}})
         })
         .catch(err => console.error(err));
       
   }

   useEffect(() =>{
       speak({ text: reply, voice: character === 'aj'?voices[1]: character === 'amy'?voices[2]: voices[4]})
   }, [reply])



   useEffect(() =>{
  

      setTimeout(() => {
         chatDown.current.scrollIntoView({behavior: 'smooth'})
      }, 500);
      
  }, [])



 useEffect(() => {
   const interval = setInterval(() => setWalkTimer((prevCount) => prevCount + 1), 1000)
   return () => clearInterval(interval);
 }, [])

 useEffect(() => {
   if(walkTimer > 20){
      setAction('walk')
   }
 }, [walkTimer])

 useEffect(() => {
   setWalkTimer(0)
   if(action === 'wave'){
      setTimeout(() => {
         setAction('idle')
      }, 5000);
   }

   if(action === 'hit'){
      setTimeout(() => {
         setAction('idle')
      }, 5000);
   }

   if(action === 'walk'){
      setTimeout(() => {
         setAction('idle')
      }, 14000);
   }

   if(action === 'backflip'){
      setTimeout(() => {
         setAction('idle')
      }, 4000);
   }
   if(action === 'dance'){
      setTimeout(() => {
         setAction('idle')
      }, 10000);
   }
 }, [action])


//   if(!user){
//    return (
//       <Form setUser = {setUser}/>
//    )
//   }
   return (
      <div className='app'>
         <div className={!menuOpen?'characterContainer':'characterContainer menuOpen'}>
            <h1>Characters</h1>
            <div className={'characterSwitch'}>
               <button onClick={() =>{ setCharacter('aj'); setMenuOpen(false)}} className={character === 'aj'?'activeCharacter':'inactiveCharacter'}>Aj</button>
               <button onClick={() => {setCharacter('amy'); setMenuOpen(false)}}  className={character === 'amy'?'activeCharacter':'inactiveCharacter'}>Amy</button>
               <button onClick={() => {setCharacter('romero'); setMenuOpen(false)}}  className={character === 'romero'?'activeCharacter':'inactiveCharacter'}>Romero</button>
               {/* <button onClick={()=> logout()} className='logout'>Logout</button> */}
            </div>
         </div>
         <div className='chatArea' onClick={() => setMenuOpen(false)}>
            <div className='chat'>
               {conversation.map((chat, index) => <div key={index} className={chat.sender?'talk sent': 'talk received'}>{chat.text}</div>)}
              { chatLoading && <div className='dotContainer'>
                  <span className='dot one'></span>
                  <span className='dot two'></span>
                  <span className='dot three'></span>
               </div>}
               <div ref={chatDown}></div>
            </div>
            <div className= 'actions'>
               <button onClick={() => setAction('dance')}>Dance</button> 
               <button onClick={() => setAction('backflip')}>Backflip</button> 
               <button onClick={() => setAction('wave')}>Wave</button></div>
            <div className='chatInput'>
            <div className='textAreaContainer'>
               <TextareaAutosize style={{
                  backgroundColor:'white',
                  borderRadius:'20px',
                  outline:'none',
                  border:'none',
                  width:'100%',
                  height:'2rem',
                  resize:'none',
                  padding:'1rem',
                  fontSize:'1rem',
                  color:'#c07d9a',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none'
               }}
               maxRows={3} 
               onChange = {({target}) => setText(target.value)}
            onFocus= {() => {
               setTimeout(() => {
                  chatDown.current.scrollIntoView({behavior: 'smooth'})
               }, 500);
               setMenuOpen(false)
            }}
               value ={text}
               />
                 
            </div>
           {!listening && <span className="material-symbols-outlined mic" onMouseDown={listen} onTouchStart={listen}>
                     mic
            </span>}
            {listening && <div className='svgContainer' onMouseUp = {stop} onTouchEnd={stop}>
               <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                              <path fill="#c07d9a" d="M50,-27.5C58.5,-14.2,54.8,7.6,44.4,29.5C34,51.3,17,73.2,-4.7,75.9C-26.3,78.6,-52.7,62.1,-64.7,39.3C-76.6,16.6,-74.3,-12.5,-61.1,-28.5C-47.9,-44.6,-24,-47.7,-1.6,-46.7C20.8,-45.8,41.5,-40.9,50,-27.5Z" transform="translate(100 100)" />
                        </svg>
            </div>}
            <span className="material-symbols-outlined send" onClick={() => {
                     text && setConversation(prev => prev.concat({text, sender: true}));
                      message();
                     setTimeout(() => {
                        chatDown.current.scrollIntoView({behavior: 'smooth'})
                     }, 500);
                     
                  }}>
                     send
            </span>
            </div>
         </div>
         <div className='canvasContainer'>
            <span className="material-symbols-outlined menu" onClick={() => setMenuOpen(true)}>
                     person
            </span>
            <Canvas
            onClick={() =>{ action === 'idle' && setAction('hit'); setMenuOpen(false)}}
               camera={{ position: [2, 0, 12.25], fov: 15 }}
               style={{
                  width: '100%',
                  height: '100%',
               }}
            >
               <ambientLight intensity={1.25} />
               <ambientLight intensity={0.1} />
               <directionalLight intensity={0.4} />
               <Suspense fallback={null}>
                  {character === 'aj'&& action === 'wave' && <Wave position={[0.025, -0.9, 0]} />}
                  {character === 'aj' && action === 'idle' && <Idle position={[0.025, -0.9, 0]}/>}
                  {character === 'aj' && action === 'hit' && <Ajhit position={[0.025, -0.9, 0]}/>}
                  {character === 'aj' && action === 'walk' && <Ajwalk position={[0.025, -0.9, 0]}/>}
                  {character === 'aj' && action === 'backflip' && <AjBackFlip position={[0.025, -0.9, 0]}/>}
                  {character === 'aj' && action === 'dance' && <AjDance position={[0.025, -0.9, 0]}/>}
                  {character === 'amy' && action === 'idle' && <AmyIdle position={[0.025, -0.9, 0]}/>}
                  {character === 'amy' && action === 'walk' && <AmyWalk position={[0.025, -0.9, 0]}/>}
                  {character === 'amy'&& action === 'wave' && <AmyWave position={[0.025, -0.9, 0]} />}
                  {character === 'amy' && action === 'dance' && <AmyDance position={[0.025, -0.9, 0]}/>}
                  {character === 'amy' && action === 'backflip' && <Amybackflip position={[0.025, -0.9, 0]}/>}
                  {character === 'amy' && action === 'hit' && <AmyHit position={[0.025, -0.9, 0]}/>}
                  {character === 'romero' && action === 'idle' && <RomeroIdle position={[0.025, -0.9, 0]}/>}
                  {character === 'romero' && action === 'walk' && <RomeroWalk position={[0.025, -0.9, 0]}/>}
                  {character === 'romero'&& action === 'wave' && <RomeroWave position={[0.025, -0.9, 0]} />}
                  {character === 'romero' && action === 'hit' && <RomeroHit position={[0.025, -0.9, 0]}/>}
                  {character === 'romero' && action === 'dance' && <RomeroDance position={[0.025, -0.9, 0]}/>}
                  {character === 'romero' && action === 'backflip' && <RomeroBackflip position={[0.025, -0.9, 0]}/>}
               </Suspense>
               <OrbitControls 
               enableZoom = {false}
               enablePan = {false}
               minPolarAngle = { Math.PI/2}
               maxPolarAngle = {Math.PI/2}
                />
            </Canvas>
         </div>
      </div>
   );
}