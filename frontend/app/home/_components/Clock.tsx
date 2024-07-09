"use client";
import { changeTheme } from '@/app/utils/theme-changer';
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { BsSkipForwardFill } from 'react-icons/bs'

const themes = ['scary-red', 'grassy-green', 'bleed-blue'];
const Clock = () => {
    const [userState, setUserState] = useState<number>(0);
    const handleUserState = (index: number) => {
        if(index == userState){
            return;
        }
        changeTheme(themes[index]);
        setUserState(index);
    }
  return (
    <main className='p-4 mx-auto bg-secondary w-4/5 rounded-md'>
        <div className='container flex flex-col gap-2 items-center'>
            <div className='flex flex-wrap gap-2'>
                <Button className={`text-sm ${userState == 0? 'bg-primary text-secondary' : 'bg-transparent'}`} onClick={()=>handleUserState(0)}>Pomodoro</Button>
                <Button className={`text-sm ${userState == 1? 'bg-primary text-secondary' : 'bg-transparent'}`} onClick={() => handleUserState(1)}>Short Break</Button>
                <Button className={`text-sm ${userState == 2? 'bg-primary text-secondary' : 'bg-transparent'}`} onClick={() =>handleUserState(2)}>Long Break</Button>
            </div>
            <h2 className='text-[72px] md:text-[96px] font-semibold'>15:49</h2>
            <div className='relative w-full flex justify-center items-center'>
                <Button className='bg-primary text-[16px] md:text-[24px] lg-text[48px] font-semibold p-2 md:p-4 lg:p-8 text-secondary'>Pause</Button>
                <BsSkipForwardFill className='absolute right-0 md:right-8 lg:right-8 text-[20px] md:text-[32px]' />
            </div>
        </div>
    </main>
  )
}

export default Clock