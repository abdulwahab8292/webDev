import './App.css'
{/* 
  import { ShareIcon } from './components/icons/ShareIcon'; 
*/}
import { useState } from 'react';
import { Button } from './components/ui/Button'
import { CreateContentModel } from './components/ui/CreateContentModal';
import { PlusIcon } from './components/icons/PlusIcon';
import { Card } from './components/ui/Card';

function App() {
  const [isOpen, setIsOpen] =  useState<boolean>(false);
  return (
    <div>
      <CreateContentModel isOpen={isOpen} setIsOpen={setIsOpen}/>
      <Button
        variant="primary"
        size="sm"
        text="Add Content"
        startIcon={<PlusIcon size={"md"}/>}
        onClick={() => {
          setIsOpen(true);
        }}
      /> 
      
     
      <Card platformType='default' url='https://youtu.be/EvzNDQLwCqw?si=QDtWsP4uECL_IAfC' title='My First Note' description='This is a brief description of my first note.' tags={['ideas', 'learning']} />
    </div>
  )
}

export default App;