"use client";
import React, { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import {
  checkIfUserExists,
  createUser,
  getUserData,
  updateUserSettings,
} from "../utils/api.service";
import Clock from "./_components/Clock";
import Header from "./_components/Header";
import TaskManager from "./_components/TaskManager";
import Game from "./_components/Game";
export interface User {
  id?: number; // Optional because it will be generated by the backend
  firstName: string;
  emailAddress: string;
  pomoSessionDuration: number;
  pomoSessionBreak: number;
  totalSessions?: number; // Optional, as it might not be set when creating
  totalTasks?: number; // Optional, as it might not be set when creating
}

const Page = () => {
  const [pomoUser, setPomoUser] = useState<User | null>(null);
  const [pomoSessionDuration, setPomoSessionDuration] = useState<number>(25);
  const [pomoSessionBreak, setPomoSessionBreak] = useState<number>(5);
  const { user } = useUser();

  const handlePDChange = (newDuration: number) => {
    setPomoSessionDuration(newDuration);
  };

  const handlePBChange = (newBreak: number) => {
    setPomoSessionBreak(newBreak);
  };

  const checkAndCreateUser = async (
    email: string | null,
    name: string | null
  ) => {
    if (!email || !name) return;

    const doesUserExist = await checkIfUserExists(email);
    if (doesUserExist.data === -1) {
      const newUser = await createUser(email, name);
      setPomoUser(newUser.data);
    } else {
      const getUser = await getUserData(doesUserExist.data);
      setPomoUser(getUser.data);
    }
  };

  useEffect(() => {
    if (user) {
      const email = String(user?.primaryEmailAddress);
      checkAndCreateUser(email, user.firstName);
    }
  }, [user]);

  useEffect(() => {
    if (pomoUser) {
      setPomoSessionBreak(pomoUser.pomoSessionBreak);
      setPomoSessionDuration(pomoUser.pomoSessionDuration);
    }
  }, [pomoUser]);

  const updatePomoSettings = async (newPD: number, newPB: number) => {
    if (pomoUser) {
      const updatedUser = {
        ...pomoUser,
        pomoSessionDuration: newPD,
        pomoSessionBreak: newPB,
      };
      setPomoUser(updatedUser);
      setPomoSessionDuration(newPD);
      setPomoSessionBreak(newPB);
      const updated = await updateUserSettings(updatedUser); // Ensure id is not undefined
    }
  };

  useEffect(() => {
    if (
      pomoUser?.pomoSessionBreak != pomoSessionBreak ||
      pomoUser?.pomoSessionDuration != pomoSessionDuration
    ) {
      updatePomoSettings(pomoSessionBreak, pomoSessionDuration);
    }
  }, [pomoSessionBreak, pomoSessionDuration]);

  return (
    <div className="mx-auto w-full lg:w-1/2 md:w-3/4 flex flex-col gap-2">
      <Header
        pd={pomoSessionDuration}
        pb={pomoSessionBreak}
        setPD={handlePDChange}
        setPB={handlePBChange}
      />
      <Clock
        pomoSessionDuration={pomoSessionDuration}
        pomoSessionBreak={pomoSessionBreak}
      />
      {/* {pomoUser && <h1 className="p-4">{pomoUser.firstName}</h1>} */}
      {/* {!pomoUser && <h1 className="p-4">user</h1>} */}
      <TaskManager />
      <Game />
    </div>
  );
};

export default Page;
