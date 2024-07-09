"use client";
import React, { useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs';
import { checkIfUserExists, createUser, getUserData } from '../utils/api.service';
import Clock from './_components/Clock';
import Header from './_components/Header';

export interface User {
  id?: number; // Optional because it will be generated by the backend
  firstName: string;
  emailAddress: string;
  pomoSessionDuration: number;
  pomoSessionBreak: number;
  totalSessions?: number; // Optional, as it might not be set when creating
  totalTasks?: number; // Optional, as it might not be set when creating
}

const page = () => {
  const [pomoUser, setPomoUser] = useState<User>();
  const { user } = useUser();

  useEffect(() => {
    const checkAndCreateUser = async (email: string | null, name: string | null) => {
      if(email == null || name == null){
        return;
      }
      const doesUserExist = await checkIfUserExists(email);
      console.log("Passed null clause -> " + email +  " - " + name);
      console.log(doesUserExist.data);
      if(doesUserExist.data === -1){
        console.log("Creating user");
        const newUser = await createUser(email, name);
        setPomoUser(newUser.data);
        console.log(newUser.data);
      }else{
        const getUser = await getUserData(doesUserExist.data);
        setPomoUser(getUser.data);
      }
    }

    if (user) {
      const email = String(user?.primaryEmailAddress);
      checkAndCreateUser(email, user.firstName);
    }
  },[user])
  return (
    <div className='mx-auto w-full lg:w-1/2 md:w-3/4'>
      <Header />
      <Clock />
      {pomoUser && <h1 className='p-4'>{pomoUser.firstName}</h1>}
    </div>
  )
}

export default page