import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UserButton } from '@clerk/nextjs'
import { Settings } from 'lucide-react'
import React from 'react'
import { SiClockify } from 'react-icons/si'

const Header = () => {
  return (
    <header className='p-4 container'>
            <div className='flex justify-between items-center text'>
                <div className='text-white text-2xl font-bold flex items-center'>
                <SiClockify className='mr-2' /> Pomodoro
                </div>
                <div className='flex items-center space-x-4'>
                    <Button className='text-muted rounded-full'>
                        <Settings />
                    </Button>
                    <UserButton />
                </div>
            </div>
            <Separator className='my-2 bg-secondary'/>
    </header>
  )
}

export default Header