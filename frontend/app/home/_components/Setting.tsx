"use client";
import React, { useState} from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';

const Setting = ({pd, pb, handleUpdate}: {pd:number, pb:number, handleUpdate: Function}) => {
    const [duration, setDuration] = useState<number>(pd);
    const [breakTime, setBreakTime] = useState<number>(pb);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleUpdate(breakTime, duration);
    };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='text-muted rounded-full p-2'>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-white text-black'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Duration
            </Label>
            <Input id='duration' min={5} max={59}  type='number'
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))} 
                className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Break
            </Label>
            <Input id='break' type='number' min={1} max={19}
                value={breakTime}
                onChange={(e) => setBreakTime(Number(e.target.value))}
                className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
            <DialogClose>
                <Button type='submit' className='text-white'>Save changes</Button>
            </DialogClose>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Setting;
