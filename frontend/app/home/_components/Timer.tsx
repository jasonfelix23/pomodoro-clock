import React, { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { BsSkipForwardFill } from 'react-icons/bs';
import { Button } from '@/components/ui/button';

const Timer = ({expiryTimestamp, handleUserState, userState, slag} : {expiryTimestamp:Date, handleUserState: Function, userState: number, slag: number}) => {
    const {totalSeconds, seconds, minutes, hours, isRunning, start, pause, resume, restart} = useTimer({expiryTimestamp, autoStart:false, onExpire: ()=>handleExpire()});
    const [isStarted, setIsStarted] = useState(false);

    useEffect (() => {
      restart(expiryTimestamp, false);
    }, [expiryTimestamp])

    const handleStartClick = () => {
      start();
      setIsStarted(true);
    }
    const handleResetClick = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + slag);
        restart(time, false);
    }

    const handleExpire = () => {
      handleUserState((userState+1)%3);
    }
    
  return (
    <div className='w-full'>
        <h2 className='text-[72px] md:text-[96px] font-semibold text-center'>{minutes}: {seconds}</h2>
        <div className='relative w-full flex justify-center items-center'>
          {!isStarted ? (
              <Button
                className='bg-primary text-[16px] md:text-[24px] lg:text-[48px] font-semibold p-2 md:p-4 lg:p-8 text-secondary'
                onClick={handleStartClick}
              >
                Start
              </Button>
          ): isRunning ? (
            <Button
              className='bg-primary text-[16px] md:text-[24px] lg:text-[48px] font-semibold p-2 md:p-4 lg:p-8 text-secondary'
              onClick={pause}
            >
              Pause
            </Button>
          ): (
            <Button
              className='bg-primary text-[16px] md:text-[24px] lg:text-[48px] font-semibold p-2 md:p-4 lg:p-8 text-secondary'
              onClick={resume}
            >
              Start
            </Button>
          )}
          <BsSkipForwardFill className='absolute right-2 sm:right-6 md:right-8 lg:right-12 xl:right-24 text-[20px] md:text-[32px]' onClick={handleResetClick}/>
    
        </div>
    </div>
  )
}

export default Timer