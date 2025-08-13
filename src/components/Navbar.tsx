import { useState } from "react";
import { motion } from "motion/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="min-w-full p-2 bg-white shadow-2xl flex items-center justify-between fixed z-20 top-0">
      <a href="/" className="flex items-center gap-2 cursor-pointer">
        <div className="relative w-20 h-20 rounded-full bg-black overflow-hidden">
          <img
            src="/TaskNest.png"
            alt="doctor icon"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold text-teal-800">TaskNest</h2>
      </a>

      <ul className="lg:flex hidden items-center justify-center gap-9 text-md font-semibold text-gray-600 list-none">
        <li>
          <a href="/">
            <motion.div
              whileHover={{
                scale: 1.1,
                backgroundColor: "teal",
                color: "white",
              }}
              className="px-3 py-2 rounded-xl cursor-pointer"
            >
              Home
            </motion.div>
          </a>
        </li>

        <li
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
          className="relative"
        >
          <motion.div
            onClick={() => setIsServicesOpen(!isServicesOpen)}
            whileHover={{ scale: 1.1, backgroundColor: "teal", color: "white" }}
            className="px-3 py-2 rounded-xl cursor-pointer relative"
          >
            Services
          </motion.div>

          {isServicesOpen && (
            <div className="absolute top-10 bg-white shadow-lg w-[200px] rounded-lg p-4 right-0">
              <ul className="flex flex-col gap-2">
                <li className="text-center">
                  <a
                    href="/taskManager"
                    className="cursor-pointer hover:bg-teal-500 hover:text-white px-3 py-2 rounded-lg block"
                  >
                    Add Tasks
                  </a>
                </li>
              </ul>
            </div>
          )}
        </li>

        <li>
          <a href="/">
            <motion.div
              whileHover={{
                scale: 1.1,
                backgroundColor: "teal",
                color: "white",
              }}
              className="px-3 py-2 rounded-xl cursor-pointer"
            >
              About Us
            </motion.div>
          </a>
        </li>

        <li>
          <a href="/">
            <motion.div
              whileHover={{
                scale: 1.1,
                backgroundColor: "teal",
                color: "white",
              }}
              className="px-3 py-2 rounded-xl cursor-pointer"
            >
              Contact Us
            </motion.div>
          </a>
        </li>
      </ul>
      <div>
        {!isLoggedIn ? (
          <a href="/loginForm">
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "red",
                color: "white",
              }}
              className="hidden lg:inline-block px-4 py-2 bg-black text-white rounded-lg shadow-2xl mr-4 cursor-pointer"
            >
              Login
            </motion.button>
          </a>
        ) : (
          <motion.button
            onClick={logout}
            whileHover={{ scale: 1.1, backgroundColor: "red", color: "white" }}
            className="hidden lg:inline-block px-4 py-2 bg-gray-800 text-white rounded-lg shadow-2xl mr-4 cursor-pointer"
          >
            Logout
          </motion.button>
        )}
      </div>

      <ul className="flex items-center gap-4 text-md font-semibold list-none lg:hidden">
        <li>
          <div>
            {!isLoggedIn ? (
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "red",
                  color: "white",
                }}
                className="hidden lg:inline-block px-4 py-2 bg-black text-white rounded-lg shadow-2xl mr-4 cursor-pointer"
              >
                Login
              </motion.button>
            ) : (
              <motion.button
                onClick={logout}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "red",
                  color: "white",
                }}
                className="hidden lg:inline-block px-4 py-2 bg-gray-800 text-white rounded-lg shadow-2xl mr-4 cursor-pointer"
              >
                Logout
              </motion.button>
            )}
          </div>
        </li>
        <li
          className="text-xl cursor-pointer relative"
          onClick={handleDropdown}
        >
          <GiHamburgerMenu />
        </li>

        {isOpen && (
          <div className="absolute w-[250px] top-20 right-7 bg-white text-gray-800 font-bold shadow-2xl p-4  rounded-2xl">
            <ul className="flex flex-col items-center gap-9">
              <li className="w-full">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "teal",
                    color: "white",
                  }}
                  className="cursor-pointer w-full text-center px-2 rounded-md"
                >
                  Home
                </motion.div>
              </li>

              <li className="w-full">
                <motion.div
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "teal",
                    color: "white",
                  }}
                  className="cursor-pointer w-full text-center px-2 rounded-md"
                >
                  Services
                </motion.div>
              </li>
            </ul>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
