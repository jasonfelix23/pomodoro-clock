"use client";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { BsSkipForwardFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const Timer = ({
  expiryTimestamp,
  handleUserState,
  userState,
  slag,
}: {
  expiryTimestamp: Date;
  handleUserState: Function;
  userState: number;
  slag: number;
}) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => handleExpire(),
  });
  const [isStarted, setIsStarted] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);

  useEffect(() => {
    restart(expiryTimestamp, false);
  }, [expiryTimestamp]);

  const handleStartClick = () => {
    start();
    setIsStarted(true);
  };
  const handleResetClick = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + slag);
    restart(time, false);
  };

  const handleExpire = () => {
    if (userState === 0) {
      setPomodoroCount((prevCount) => prevCount + 1);
      if (pomodoroCount % 4 === 3) {
        handleUserState(2);
      } else {
        handleUserState(1);
      }
    } else {
      handleUserState(0);
    }

    // handleUserState((userState+1)%3);
  };

  return (
    <div className="w-full">
      <h2 className="text-[72px] md:text-[96px] font-semibold text-center">
        {minutes}: {seconds}
      </h2>
      <div className="relative w-full flex justify-center items-center">
        {!isStarted ? (
          <Button
            className="bg-primary text-[20px] md:text-[24px] lg:text-[36px] font-semibold p-4 md:p-4 lg:p-6 xl:p-8 text-secondary"
            onClick={handleStartClick}
          >
            Start
          </Button>
        ) : isRunning ? (
          <Button
            className="bg-primary text-[20px] md:text-[24px] lg:text-[36px] font-semibold p-4 md:p-4 lg:p-6 xl:p-8 text-secondary"
            onClick={pause}
          >
            Pause
          </Button>
        ) : (
          <Button
            className="bg-primary text-[20px] md:text-[24px] lg:text-[36px] font-semibold p-4 md:p-4 lg:p-6 xl:p-8 text-secondary"
            onClick={resume}
          >
            Start
          </Button>
        )}
        <BsSkipForwardFill
          className="absolute right-2 sm:right-6 md:right-8 lg:right-10 xl:right-6 text-[20px] md:text-[32px]"
          onClick={handleResetClick}
        />
      </div>
    </div>
  );
};

export default Timer;
