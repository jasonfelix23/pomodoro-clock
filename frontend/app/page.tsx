"use client";
import Image from "next/image";
import { ping } from "./utils/api.service";
import { useEffect } from "react";
export default function Home() {
  
  useEffect(()=> {
    console.log(ping());
    console.log("HIEdfa");
  }, [])
  return (
    <div>
      Jason
    </div>
  );
}
