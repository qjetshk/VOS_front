import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import burger from "../assets/burger.svg";
import close from "../assets/close.svg";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? "hidden" : "auto";
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <header>
      <nav className="h-[85px] flex justify-between items-center border-b-lgray border-b-[1px]">
        <Link to="/">
          <img src={logo} />
        </Link>

        <ul className="tablet:flex hidden gap-[30px] font-medium text-black items-center">
          {!user && (
            <li>
              <Link
                className="transition duration-300 hover:text-blue"
                to="/reg"
              >
                регистрация
              </Link>
            </li>
          )}

          {!user && (
            <li>
              <Link
                className="transition duration-300 hover:text-blue"
                to="/auth"
              >
                вход
              </Link>
            </li>
          )}

          <li>
            <Link
              className="transition duration-300 hover:text-blue"
              to="/dashboard"
            >
              мероприятия
            </Link>
          </li>

          {user && (
            <li>
              <Link
                className="transition duration-300 hover:text-blue"
                to="/add"
              >
                +
              </Link>
            </li>
          )}

          {user && (
            <li>
              <Link to="/personal">
                <Avatar
                  name={user.name.charAt(0)}
                  width={40}
                  fz={18}
                  transition={true}
                />
              </Link>
            </li>
          )}
        </ul>

        <img
          src={burger}
          className="tablet:hidden cursor-pointer"
          onClick={toggleMenu}
        />
      </nav>

      {isMenuOpen && (
        <nav className="tablet:px-15 mobile:px-5 px-15 pt-[20px] fixed top-0 left-0 w-full h-full bg-white z-50 desktop:hidden">
          <div className="max-w-[1200px] mx-auto">
            <ul className="font-mont font-semibold flex flex-col gap-6 mobile:text-[36px] med:text-[48px]">
              <div className="flex justify-between items-center">
                {!user && (
                  <li>
                    <Link
                      className="transition duration-300 hover:text-blue"
                      to="/reg"
                      onClick={handleMobileLinkClick}
                    >
                      регистрация
                    </Link>
                  </li>
                )}
                <img src={close} onClick={toggleMenu} />
              </div>

              {!user && (
                <li>
                  <Link
                    className="transition duration-300 hover:text-blue"
                    to="/auth"
                    onClick={handleMobileLinkClick}
                  >
                    вход
                  </Link>
                </li>
              )}

              {user && (
                <li>
                  <Link
                    className="transition duration-300 hover:text-blue"
                    to="/personal"
                    onClick={handleMobileLinkClick}
                  >
                    личный кабинет
                  </Link>
                </li>
              )}

              {user && (
                <li>
                  <Link
                    className="transition duration-300 hover:text-blue"
                    to="/add"
                    onClick={handleMobileLinkClick}
                  >
                    добавить
                  </Link>
                </li>
              )}

              <li>
                <Link
                  className="transition duration-300 hover:text-blue"
                  to="/dashboard"
                  onClick={handleMobileLinkClick}
                >
                  мероприятия
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
