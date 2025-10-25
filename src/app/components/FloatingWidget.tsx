"use client";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import ChatSupport from "./ChatSupport";
import DarkMode from "./DarkMode";

export default function FloatingWidget() {
  const [hidden, setHidden] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // Function to start/reset hide timer
  // const startTimer = () => {
  //   if (timerId) clearTimeout(timerId);
  //   const id = setTimeout(() => setHidden(true), 5000); // 5 sec idle
  //   setTimerId(id);
  // };

  // useEffect(() => {
  //   // Start timer initially
  //   startTimer();

  //   // Reset timer on any user interaction
  //   const resetOnActivity = () => {
  //     setHidden(false); // make sure it's visible again
  //     startTimer();
  //   };

  //   window.addEventListener("mousemove", resetOnActivity);
  //   window.addEventListener("keydown", resetOnActivity);
  //   window.addEventListener("click", resetOnActivity);
  //   window.addEventListener("touchstart", resetOnActivity);

  //   return () => {
  //     if (timerId) clearTimeout(timerId);
  //     window.removeEventListener("mousemove", resetOnActivity);
  //     window.removeEventListener("keydown", resetOnActivity);
  //     window.removeEventListener("click", resetOnActivity);
  //     window.removeEventListener("touchstart", resetOnActivity);
  //   };
  // }, []);

  return (
    <div className="fixed right-0 bottom-0 z-50 w-full">
      <div
        className={`flex items-center transition-all duration-500 ${hidden ? "translate-x-full" : "translate-x-0"
          }`}
      >

        <div className="fixed lg:right-2 right-0 bottom-0  ">
          <ChatSupport />
          <DarkMode />
        </div>

        {/* Expand Arrow (only when hidden) */}
        {/* {hidden && (
          <button
            onClick={() => {
              setHidden(false);
              startTimer();
            }}
            className="fixed right-2 bottom-2 bg-white dark:bg-neutral-900 rounded-full p-2 shadow-md hover:shadow-lg transition"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        )} */}
      </div>
    </div>
  );
}
