'use client'; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState,useMemo,useEffect } from "react";

// Import custom UI components from the UI directory
import { Button } from "./ui/button";
import { Card } from "./ui/card";

// Default export of the DigitalClockComponent function
const DigitalClock = () => {
      // State hooks for managing current time, time format (24-hour or 12-hour), and component mount status
    const [time,setTime] = useState<Date>(new Date());
    const [is24Hour,setIs24Hour] = useState<boolean>(true);
    const [mounted,setMounted] = useState<boolean>(false);

      // Effect hook to run on component mount
    useEffect(()=>{
        setMounted(true); // Set mounted status to true
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return() => clearInterval(interval); // Cleanup the interval on component unmount
    },[])

      // Memoized computation of formatted time to avoid unnecessary recalculations
    const formattedTime = useMemo<string>(()=>{
        if(!mounted)  return "";  // Don't render time on the server
        const hours = is24Hour 
           ? time.getHours().toString().padStart(2,"0") // Format hours in 24-hour format
           : (time.getHours() % 12 || 12).toString().padStart(2,"0"); // Format hours in 12-hour format
           const minutes = time.getMinutes().toString().padStart(2,"0"); // Format minutes
           const seconds = time.getSeconds().toString().padStart(2,"0"); // Format seconds
           return `${hours}:${minutes}:${seconds}`; // Return formatted time string
    },[time,is24Hour,mounted]) // Dependencies to re-run the memoized function

    // JSX return statement rendering the digital clock UI
  return (
    <div className="bg-black flex justify-center items-center h-screen">
        {/* Center the digital clock within the screen */}
      <Card className="w-full max-w-md rounded-2xl shadow-lg p-8">
        <div className="flex flex-col justify-center items-center">
        {/* Header with title */}
        <h1 className="font-bold text-2xl tracking-tight">
            Digital Clock
         </h1>
         {/* Description */}
         <p className="text-sm text-gray-500 mb-4">
         Display current time in hours, minutes, and seconds.
         </p>
         {/* Display the formatted time */}
         <div className="text-6xl font-bold">
            {formattedTime}
         </div>
        {/* Buttons to switch between 24-hour and 12-hour formats */}
        <div className="mt-4 flex items-center gap-2">
            <Button
            variant={is24Hour ? "default" : "outline"}
            onClick={() => setIs24Hour(true)}
            className="font-bold rounded-2xl"
            >
                24-Hour Format
            </Button>
            <Button
            variant={!is24Hour ? "default" : "outline"}
            onClick={() => setIs24Hour(false)}
            className="font-bold rounded-2xl"
            >
                12-Hour Format
            </Button>
        </div>
        </div>
      </Card>
    </div>
  )
}

export default DigitalClock
