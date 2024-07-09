"use client";
import Image from "next/image";
import { ping } from "./utils/api.service";
import { useEffect, useState } from "react";
import { ApiResponse } from "./utils/api.service";
import { SiClockify } from "react-icons/si";

export default function Home() {
  useEffect(() => {
    const fetchPing = async () => {
      try {
        const ob: ApiResponse<String> = await ping();
        console.log(ob.data);
      } catch (error) {
        console.error("Error fetching ping:", error);
      }
    };

    fetchPing();
  }, []);
  return (
    <div className="flex flex-col items-center mt-10 gap-2">
        <SiClockify size={200} className="text-muted"/>
        <h2 className="text-[36px]">Pomodoro</h2>
        <div className="flex gap-2 mt-10">
          <a
            className="group relative inline-flex items-center overflow-hidden rounded bg-muted px-8 py-3 text-primary focus:outline-none focus:ring active:bg-muted"
            href="/sign-in"
            >
            <span className="absolute -start-full transition-all group-hover:start-4">
              <svg
                className="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
              </svg>
            </span>

            <span className="text-sm font-medium transition-all group-hover:ms-4"> Login </span>
          </a>

          <a
            className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-muted focus:outline-none focus:ring active:text-muted"
            href="/sign-up"
            >
            <span className="absolute -start-full transition-all group-hover:start-4">
              <svg
                className="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
              </svg>
            </span>

            <span className="text-sm font-medium transition-all group-hover:ms-4"> Register </span>
          </a>

        </div>
    </div>
  );
}
