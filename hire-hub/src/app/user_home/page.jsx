import Image from "next/image";
import Link from "next/link";

import styles from '../../style/user_home.module.css'




export default function Home() {
  return (
    <>
      <div className="bg-gray-900">
    <div className="container mx-auto px-10">
    <nav className="flex items-center justify-between py-4">

      <div className="flex items-center flex-shrink-0 text-white mr-6">
      <input type="text" name="text" placeholder="Search 'UIverse'" className="input"></input>
        <span className="w-5font-semibold text-xl tracking-tight">&nbsp;&nbsp;&nbsp;<Link href="/">Jobify</Link></span>
      </div>


      <div className="hidden  md:flex md:items-center md:ml-auto md:mr--10 ">

        <p className="text-gray-300 hover:text-white px-4"><Link href="/">Home</Link></p>
        <p className="text-gray-300 hover:text-white px-4">About</p>
        <p className="text-gray-300 hover:text-white px-4">Services</p>
        <p className="text-gray-300 hover:text-white px-4">Contact</p>


      </div>
    </nav>
  </div>
</div>
<div className="h-screen flex justify-center items-center bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
  <div><p className="text-4xl font-bold animate-appear text-black">Welcome to Jobify&nbsp;&nbsp;&nbsp;</p></div>
  <div>
  <Link href="/signup">
    <button className={styles.get_started-io-button}>
    Get Started
    
    
    <div className={styles.icon}>
      <svg
        height="24"
        width="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0z" fill="none"><Link href="/signup">Get Started</Link></path>
        <path
          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
          fill="currentColor"
        ></path>
      </svg>
  </div>
</button></Link>
</div>

</div>


<footer className={styles.footer}>
        <p>Developed by Zawad, Rupkatha, Sreya</p>
    </footer>


</>



  );
}
