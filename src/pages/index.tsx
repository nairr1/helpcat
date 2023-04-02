import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";

import { Brands } from "~/utils/brands";

const Home: NextPage = () => {
  const router = useRouter();

  const [searchBrand, setSearchbrand] = useState("");

  function handleBrandSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchbrand(event.target.value);
  }

  async function submitBrandSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await router.push(`/${searchBrand}`).then().catch(Error);
  }

  return (
    <>
      <Head>
        <title>Helpcat</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="hidden lg:flex flex-col justify-center items-center text-center ">
        <form 
          className='flex flex-col pb-[5rem] pt-[3rem] items-center justify-center text-center font-light'
          onSubmit={submitBrandSearch}
        >
          <input 
            type='text' 
            className='text-2xl w-[15rem] outline-none bg-1c1b1c mb-4'
            placeholder='*.redcatcloud.com.au' 
            spellCheck='false' 
            onChange={handleBrandSearch}
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
                <Link href={`https://helpcat.io/storestatus/${brand.query}`}>
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
                <Link href={`https://helpcat.io/storestatus/${brand.query}`}>
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
