import SearchInput from "./SearchInput"
import searchResult from "./searchResult"
import Image from "next/image";
import Link from "next/link";

import styles from '../../style/user_home.module.css'
export default function search(){
    return(

    <>

    <head><title>Search</title></head>
      <div className="bg-gray-900">
    <div className="container mx-auto px-10">
    <nav className="flex items-center justify-between py-4">

      <div className="flex items-center flex-shrink-0 text-white mr-6">
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
<div className="h-screen flex justify-center items-top bg-gradient-to-r text-transparent bg-clip-text animate-gradient">

  <div className="m-10">
            <h1 className="text-center">SEARCH</h1>
            <SearchInput searchResult={searchResult}/>
</div>

</div>


<footer className={styles.footer}>
        <p>Developed by Zawad, Rupkatha, Sreya</p>
    </footer>


</>
  );
}

