'use client'

import { useEffect, useMemo, useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button";

const DigitalClock = () => {
  
  const [time,setTime] = useState<Date>(new Date());
  const [is24Hour,setIs24Hour] = useState<boolean>(true);
  const [mounted,setMounted] = useState<boolean>(false);

  useEffect(()=>{
    setMounted(true)
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  },[])

  const formattedTime = useMemo<string>(() => {
     if(!mounted) return "";
     const hours = is24Hour 
     ? time.getHours().toString().padStart(2,"0")
     : (time.getHours() % 12 || 12).toString().padStart(2,"0");
     const minutes = time.getMinutes().toString().padStart(2,"0");
     const seconds = time.getSeconds().toString().padStart(2,"0");

     return `${hours}:${minutes}:${seconds}`;
  },[is24Hour,mounted,time])

  return (
    <div className="flex items-center justify-center h-screen">
       <Card className="rounded-xl shadow-lg pb-4">
          <CardHeader className="text-center">
             <CardTitle className="font-bold text-2xl">Digital Clock</CardTitle>
             <CardDescription className="tracking-wide">Display current time in hours, minutes and seconds.</CardDescription>
          </CardHeader>
          <div className="text-6xl text-center font-bold">{formattedTime}</div>
          <div className="flex justify-center my-4 gap-3">
          <Button 
          variant={is24Hour ? "default" : "outline"}
          className="rounded-[50px] font-bold"
          onClick={()=>setIs24Hour(true)}
          >
            24-Hour Format
          </Button>
          <Button 
          variant={!is24Hour ? "default" : "outline"}
          className="rounded-[50px] font-bold"
          onClick={()=>setIs24Hour(false)}
          >
            12-Hour Format
          </Button>
          </div>
       </Card>
    </div>
  )
}

export default DigitalClock
