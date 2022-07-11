import logo from "../../images/adithyalogo.png";
import _ from "lodash";
import {useState, useEffect} from "react";
import {Disclosure} from "@headlessui/react";
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import {getCurrentUser} from "../../services/authService";

let userName = (
  <span style={{fontSize: "20px"}}>
    <span>
      <i className="fa fa-user-circle"></i>
    </span>
    <span style={{marginLeft: "5px"}}>{_.capitalize(getCurrentUser()?.name)}</span>
  </span>
);

const navigation = [];

if (getCurrentUser()?.isGuest) {
  navigation.push({
    name: userName,
    href: "/dashboard",
    current: false,
  });
}
if (getCurrentUser()?.isAdmin) {
  navigation.push({
    name: userName,
    href: "/admin/dashboard",
    current: false,
  });
}
if (getCurrentUser()?.isRestaurant) {
  navigation.push({
    name: userName,
    href: "/restaurant/dashboard",
    current: false,
  });
}
if (getCurrentUser()?.isReception) {
  navigation.push({
    name: userName,
    href: "/reception/dashboard",
    current: false,
  });
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    getCurrentUser()?.username ? setSigned(true) : setSigned(false);
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed-top">
      {({open}) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div
                className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
                style={{alignItems: "center"}}
              >
                <a href="/" style={{textDecoration: "none"}}>
                  <div className="flex-shrink-0 flex items-center">
                    <img src={logo} style={{width: "150px"}} alt="Workflow" />
                  </div>
                </a>
                <div style={{marginTop: "15px"}} className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map(item => (
                      <a
                        style={{textDecoration: "none"}}
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                {signed ? (
                  <a
                    style={{textDecoration: "none"}}
                    href="/logout"
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign Out
                  </a>
                ) : (
                  <>
                    <a
                      style={{textDecoration: "none"}}
                      href="/signin"
                      className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                      Sign in
                    </a>
                    <a
                      style={{textDecoration: "none"}}
                      href="/signup"
                      className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Sign up
                    </a>{" "}
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
