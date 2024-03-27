import Link from "next/link";

export default function Nav() {
  return (
    <div className="bg-gray-900">
    <div className="container mx-auto px-10">
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <button className="search-button">
            <div className="hoverEffect">
              <Link href="/search">Search</Link>
              <div></div>
            </div>
          </button>
          <span className="w-5font-semibold text-xl tracking-tight">
            &nbsp;&nbsp;&nbsp;<Link href="/">Jobify</Link>
          </span>
        </div>

        <div className="hidden  md:flex md:items-center md:ml-auto md:mr--10 ">
          <p className="text-gray-300 hover:text-white px-4">
            <Link href="/">Home</Link>
          </p>
          <p className="text-gray-300 hover:text-white px-4">About</p>
          <p className="text-gray-300 hover:text-white px-4">Services</p>


              <button className="button1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link href="/login">Sign In</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button className="button2">
                <Link href="/register">Sign Up</Link>
              </button>

        </div>
      </nav>
    </div>
  </div>
  );
}