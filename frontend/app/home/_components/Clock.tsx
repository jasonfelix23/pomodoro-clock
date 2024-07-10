"use client";
import { changeTheme } from '@/app/utils/theme-changer';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState} from 'react';
import Timer from './Timer';

const themes = ['scary-red', 'grassy-green', 'bleed-blue'];

const Clock = () => {
  const [userState, setUserState] = useState<number>(0);


  const handleUserState = (index: number) => {
    if (index === userState) {
      return;
    }
    changeTheme(themes[index]);
    setUserState(index);
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer


  return (
    <main className='p-4 mx-auto bg-secondary w-4/5 rounded-md'>
      <div className='container flex flex-col gap-2 items-center'>
        <div className='flex flex-wrap gap-2'>
          <Button
            className={`text-sm ${userState === 0 ? 'bg-primary text-secondary' : 'bg-transparent'}`}
            onClick={() => handleUserState(0)}
          >
            Pomodoro
          </Button>
          <Button
            className={`text-sm ${userState === 1 ? 'bg-primary text-secondary' : 'bg-transparent'}`}
            onClick={() => handleUserState(1)}
          >
            Short Break
          </Button>
          <Button
            className={`text-sm ${userState === 2 ? 'bg-primary text-secondary' : 'bg-transparent'}`}
            onClick={() => handleUserState(2)}
          >
            Long Break
          </Button>
        </div>
        <Timer expiryTimestamp={time}/>
      </div>
    </main>
  );
};

export default Clock;
