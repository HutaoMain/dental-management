import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { Transition, UserInterface } from "../Types";
import useAuthStore from "../zustand/AuthStore";
import { useQuery } from "react-query";

const Navbar = ({ user }: any) => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const { data } = useQuery<UserInterface>({
    queryKey: ["Navbar"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`).then(
        (res) => res.json()
      ),
  });

  const clearUser = useAuthStore((state) => state.clearUser);

  const toggleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <>
      <nav className="bg-[#29B3FF]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="https://flowbite.com" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Cotabato Dental Clinics
            </span>
          </a>
          <div className="flex items-center">
            {/* <a
              href="tel:5541251234"
              className="mr-6 text-sm  text-white hover:underline"
            >
              (555) 412-1234
            </a> */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-white">{user}</span>
                <button
                  className="px-7 py-2 rounded-xl bg-[#FBC00E] hover:bg-[#FFD774] text-[12px]"
                  onClick={clearUser}
                >
                  logout
                </button>
              </div>
            ) : (
              <button
                className="px-7 py-2 rounded-xl bg-[#FBC00E] hover:bg-[#FFD774] text-[12px]"
                onClick={toggleLoginModal}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          {data?.role === "doctor" ? (
            <div className="flex items-center">
              <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                <li>
                  <a
                    href="/"
                    className="text-white hover:underline"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard"
                    className="text-white hover:underline"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/users" className="text-white hover:underline">
                    Users
                  </a>
                </li>
                <li>
                  <a
                    href="/appointments"
                    className="text-white hover:underline"
                  >
                    Appointments
                  </a>
                </li>
                {/* <li>
                <a href="#" className="text-white hover:underline">
                  Features
                </a>
              </li> */}
              </ul>
            </div>
          ) : null}
        </div>
        <Dialog
          open={isLoginOpen}
          onClose={toggleLoginModal}
          TransitionComponent={Transition}
          keepMounted
        >
          <DialogContent>
            <LoginModal toggleLoginModal={toggleLoginModal} />
          </DialogContent>
        </Dialog>
      </nav>
    </>
  );
};

export default Navbar;