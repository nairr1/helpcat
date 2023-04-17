import React, { useState } from "react";
import Image from "next/image";
import helpcat from "~/components/assets/helpcat.jpeg"
import styled from "styled-components";

const HelpcatPageLoader = () => {
    const [counter, setCounter] = useState(0);

    setTimeout(() => {
        if(counter < 1) {
            setCounter(1);
        }
    }, 1000);

    return (
        <>
            <div className={`text-center flex items-center justify-center z-999 backdrop-blur-lg transition transform duration-100 ${counter === 1 && "opacity-100" || "opacity-0"}`}>
                <div className="bg-18181a flex w-fit m-auto flex-col items-center justify-center p-10 rounded-lg">
                    <div>
                        <p className="mt-[4rem] text-2xl">
                            <H>H</H><E>E</E>LPCA<T>T</T> I<S>S</S> BU<I>I</I>LDI<N>N</N><G>G</G>..
                        </p>
                    </div>


                    <div className="text-xs text-center mt-[2rem] space-y-2 font-light shadow-[0_3px_10px_rgb(0,0,0,0)]">
                        <p>© Copyright 2022 Helpcat Pty Ltd. All Rights Reserved.</p>

                        <p>Version 2.1.0</p>
                    </div>
                    
                </div>

            </div>

            <HelpcatLoadingAnimation className="absolute top-1/2 left-52">
                <Image 
                    className={`m-auto rounded-full transition shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-1 bg-5e4fb3 transform duration-1000 ${counter !== 1 && "translate-y-full opacity-0" || "opacity-100"}`}
                    src={helpcat} 
                    width={50}
                    height={50}
                    alt="Helpcat loading animation"
                />
            </HelpcatLoadingAnimation>

            <HelpcatLoadingAnimationTwo className="absolute top-72 left-1/2">
                <Image 
                    className={`m-auto rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-1 bg-cf7b3c transition transform duration-1000 ${counter !== 1 && "-translate-y-full opacity-0" || "opacity-100"}`}
                    src={helpcat} 
                    width={50}
                    height={50}
                    alt="Helpcat loading animation"
                />
            </HelpcatLoadingAnimationTwo>

            <HelpcatLoadingAnimationFive className="absolute top-40 right-2/3">
                <Image 
                    className={`m-auto rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-1 bg-ac4fb3 transition transform duration-1000 ${counter !== 1 && "-translate-y-full opacity-0" || "opacity-100"}`}
                    src={helpcat} 
                    width={50}
                    height={50}
                    alt="Helpcat loading animation"
                />
            </HelpcatLoadingAnimationFive>

            <HelpcatLoadingAnimationSix className="absolute top-80 right-60">
                <Image 
                    className={`m-auto rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-1 bg-b32d2d transition transform duration-1000 ${counter !== 1 && "translate-y-full opacity-0" || "opacity-100"}`}
                    src={helpcat} 
                    width={50}
                    height={50}
                    alt="Helpcat loading animation"
                />
            </HelpcatLoadingAnimationSix>

            <HelpcatLoadingAnimationThree className="absolute top-20 left-52">
                <Image 
                    className={`m-auto rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-1 bg-4ca662 transition transform duration-1000 ${counter !== 1 && "-translate-y-full opacity-0" || "opacity-100"}`}
                    src={helpcat} 
                    width={50}
                    height={50}
                    alt="Helpcat loading animation"
                />
            </HelpcatLoadingAnimationThree>

            <HelpcatLoadingAnimationSeven className="absolute top-56 right-1/3 p-2">
                <Image 
                    className={`m-auto rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-1 bg-cfca3c transition transform duration-1000 ${counter !== 1 && "-translate-y-full opacity-0" || "opacity-100"}`}
                    src={helpcat} 
                    width={50}
                    height={50}
                    alt="Helpcat loading animation"
                />
            </HelpcatLoadingAnimationSeven>

            <HelpcatLoadingAnimationFour className="absolute top- left-80">
                <Image 
                    className={`m-auto rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-1 bg-99a4b0 transition transform duration-1000 ${counter !== 1 && "-translate-x-full opacity-0" || "opacity-100"}`}
                    src={helpcat} 
                    width={50}
                    height={50}
                    alt="Helpcat loading animation"
                />
            </HelpcatLoadingAnimationFour>

            <HelpcatLoadingAnimationFour className="absolute top-28 right-96">
                <Image 
                    className={`m-auto rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-1 bg-edc2d8ff transition transform duration-700 ${counter !== 1 && "translate-x-full opacity-0" || "opacity-100"}`}
                    src={helpcat} 
                    width={50}
                    height={50}
                    alt="Helpcat loading animation"
                />
            </HelpcatLoadingAnimationFour>
        </>
    );
};

export default HelpcatPageLoader;

// stylesheet

const HelpcatLoadingAnimationTwo = styled.div`
    animation: bounce2 2s ease infinite;

    @keyframes bounce2 {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-30px);}
        60% {transform: translateY(-15px);}
    }
    
`

const HelpcatLoadingAnimationFour = styled.div`
    animation: bounce2 4s ease infinite;

    @keyframes bounce2 {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-40px);}
        60% {transform: translateY(-15px);}
    }
    
`

const HelpcatLoadingAnimation = styled.div`
    animation: bounce2 1s ease infinite;

    @keyframes bounce2 {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-40px);}
        60% {transform: translateY(-15px);}
    }
    
`

const HelpcatLoadingAnimationThree = styled.div`
    animation: bounce2 3s ease infinite;

    @keyframes bounce2 {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-40px);}
        60% {transform: translateY(-15px);}
    }
    
`

const HelpcatLoadingAnimationFive = styled.div`
    animation: bounce2 5s ease infinite;

    @keyframes bounce2 {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-40px);}
        60% {transform: translateY(-15px);}
    }
    
`

const HelpcatLoadingAnimationSix = styled.div`
    animation: bounce2 6s ease infinite;

    @keyframes bounce2 {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-40px);}
        60% {transform: translateY(-15px);}
    }
    
`

const HelpcatLoadingAnimationSeven = styled.div`
    animation: bounce2 7s ease infinite;

    @keyframes bounce2 {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-40px);}
        60% {transform: translateY(-15px);}
    }
    
`

const E = styled.span`
    animation: e 1.5s linear infinite;

    @keyframes e {
        100% {
            color: #9141e6
        }
    }
`

const S = styled.span`
    animation: s 3s linear infinite;

    @keyframes s {
        100% {
            color: #cae3dd
        }
    }
`

const I = styled.span`
    animation: i 2.5s linear infinite;

    @keyframes i {
        100% {
            color: #5382d2
        }
    }
`

const N = styled.span`
    animation: n 3.5s linear infinite;

    @keyframes n {
        100% {
            color: #80eaac
        }
    }
`

const H = styled.span`
    animation: h 2s ease-in-out infinite;

    @keyframes h {
        100% {
            color: #72e6e8
        }
    }
`

const T = styled.span`
    animation: t 1.5s linear infinite;

    @keyframes t {
        100% {
            color: #d588d5
        }
    }
`

const G = styled.span`
    animation: g 1.75s ease-in-out infinite;

    @keyframes g {
        100% {
            color: #af8be9
        }
    }
`