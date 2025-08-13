import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "motion/react";

const HomePage = () => {
  return (
    <div className="min-w-full min-h-screen grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 lg:pt-20 pt-40 gap-5 lg:gap-0 md:gap-0 bg-gray-100">
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="font-bold text-teal-600 text-6xl text-center">
            Your Tasks, Your Flow
          </h1>
          <p className="text-gray-800 text-lg text-center font-bold">
            <Typewriter
              words={[
                "Organize Your Tasks",
                "Track Your Progress",
                "Achieve Your Goals",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>

          <div className="flex items-center justify-center gap-7 mt-9">
            <a href={"/taskManager"}>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "teal",
                  color: "white",
                }}
                className="px-3 py-2 bg-black text-white font-bold rounded-lg cursor-pointer"
              >
                Get Started
              </motion.button>
            </a>

            <a href={"/loginForm"}>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "teal",
                  color: "white",
                }}
                className="px-3 py-2 bg-black text-white font-bold rounded-lg cursor-pointer"
              >
                Login
              </motion.button>
            </a>
          </div>
        </div>
      </div>

      <div className="min-h-full min-w-full flex items-center justify-center mb-10 md:mb-0 lg:mb-0">
        <motion.div
          className="rounded-full overflow-hidden 
               w-[200px] h-[200px] 
               sm:w-[250px] sm:h-[250px] 
               md:w-[300px] md:h-[300px] 
               lg:w-[400px] lg:h-[400px]"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <img
            src="/TaskNest.png"
            alt="Task Management Illustration"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
