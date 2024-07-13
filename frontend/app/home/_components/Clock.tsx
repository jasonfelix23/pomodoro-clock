"use client";
import { changeTheme } from "@/app/utils/theme-changer";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";

const themes = ["scary-red", "grassy-green", "bleed-blue"];

const Clock = ({
  pomoSessionDuration,
  pomoSessionBreak,
}: {
  pomoSessionDuration: number;
  pomoSessionBreak: number;
}) => {
  const [userState, setUserState] = useState<number>(0);
  const [expiryTimestamp, setExpiryTimeStamp] = useState<Date>(new Date());
  const [resetTimer, setResetTimer] = useState<number>(
    pomoSessionDuration * 60
  );

  const handleUserState = (index: number) => {
    if (index === userState) {
      return;
    }
    changeTheme(themes[index]);
    setUserState(index);
  };

  useEffect(() => {
    const time = new Date();
    let slag = 0;
    if (userState == 0) slag = pomoSessionDuration * 60;
    else if (userState == 1) slag = pomoSessionBreak * 60;
    else slag = pomoSessionBreak * 3 * 60;
    time.setSeconds(time.getSeconds() + slag);

    setResetTimer(slag);
    setExpiryTimeStamp(time);
  }, [userState, pomoSessionBreak, pomoSessionDuration]);

  return (
    <main className="p-4 mx-auto bg-secondary w-4/5 xl:w-3/5 rounded-md">
      <div className="container flex flex-col gap-2 items-center pb-4">
        <div className="flex flex-wrap gap-2">
          <Button
            className={`text-sm ${
              userState === 0
                ? "bg-primary text-white/75"
                : "bg-transparent text-muted"
            }`}
            onClick={() => handleUserState(0)}
          >
            Pomodoro
          </Button>
          <Button
            className={`text-sm ${
              userState === 1
                ? "bg-primary text-white/75"
                : "bg-transparent text-muted"
            }`}
            onClick={() => handleUserState(1)}
          >
            Short Break
          </Button>
          <Button
            className={`text-sm ${
              userState === 2
                ? "bg-primary text-white/75"
                : "bg-transparent text-muted"
            }`}
            onClick={() => handleUserState(2)}
          >
            Long Break
          </Button>
        </div>
        <Timer
          expiryTimestamp={expiryTimestamp}
          handleUserState={handleUserState}
          userState={userState}
          slag={resetTimer}
        />
      </div>
    </main>
  );
};

export default Clock;
