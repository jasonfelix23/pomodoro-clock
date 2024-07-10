import React from 'react';
import { useTimer } from 'react-timer-hook';
import { BsSkipForwardFill } from 'react-icons/bs';
import { Button } from '@/components/ui/button';

const Timer = ({expiryTimestamp} : {expiryTimestamp:Date}) => {
    const {totalSeconds, seconds, minutes, hours, isRunning, start, pause, resume, restart} = useTimer({expiryTimestamp});
    const handleResetClick = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
    }
  return (
    <div>
        <h2 className='text-[72px] md:text-[96px] font-semibold'>{minutes}: {seconds}</h2>
        <div className='relative w-full flex justify-center items-center'>
            <Button
              className='bg-primary text-[16px] md:text-[24px] lg:text-[48px] font-semibold p-2 md:p-4 lg:p-8 text-secondary'
              onClick={start}
            >
              Start
            </Button>
            <Button
              className='bg-primary text-[16px] md:text-[24px] lg:text-[48px] font-semibold p-2 md:p-4 lg:p-8 text-secondary'
              onClick={pause}
            >
              Pause
            </Button>
            <Button
              className='bg-primary text-[16px] md:text-[24px] lg:text-[48px] font-semibold p-2 md:p-4 lg:p-8 text-secondary'
              onClick={resume}
            >
              Resume
            </Button>
            
          <BsSkipForwardFill className='absolute right-0 md:right-8 lg:right-20 text-[20px] md:text-[32px]' onClick={handleResetClick}/>
        </div>
    </div>
  )
}

export default Timer