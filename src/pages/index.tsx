import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Brands } from "~/utils/brands";

const Home: NextPage = () => {
  const user = useUser();

  const [searchBrand, setSearchbrand] = useState("");

  function handleSearchBrand(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchbrand(event.target.value);
  }

  function submitSearchBrand(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    location.href = `/${searchBrand}`;
  }

  return (
    <>
      <main className="hidden lg:flex flex-col justify-center items-center text-center ">
        <form 
          className='flex flex-col pb-[5rem] pt-[2rem] items-center justify-center text-center font-light'
          onSubmit={submitSearchBrand}
        >
          <input 
            type='text' 
            className='text-2xl w-[15rem] outline-none bg-18181a mb-4'
            placeholder='*.redcatcloud.com.au' 
            spellCheck='false' 
            onChange={handleSearchBrand}
          />

          <button  
            className="bg-20222e px-2 py-1 rounded-2xl text-sm border border-282a36 hover:bg-2f334a hover:border-5e4fb3/40 transition duration-500" 
          >
            Search
          </button>
        </form>

        <div className='grid grid-cols-5'>
          {Brands.map((brand) => (
            <ul key={brand.id}>
              <li className='px-[5rem] mb-1'>
                <Link href={`/${brand.query}`}>
                  <div>
                    <Image 
                      src={brand.image} 
                      height={50}
                      width={50}
                      className='rounded-md cursor-pointer'
                      alt="Brand Logo"
                    />
                  </div>
                </Link>
              </li>

              <p className='mb-[10rem]'>
                <Link href={`/${brand.query}`}>
                  <span className='cursor-pointer hover:underline text-sm'>{brand.title}</span>
                </Link>
              </p>

            </ul>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
