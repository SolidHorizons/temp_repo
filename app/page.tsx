"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { pb } from '@/lib/pocketbase';
import { useEffect } from 'react';
import Loader from '@/app/components/loader';

export default function Page() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        if (pb.authStore.isValid) {
            router.replace('/overview');
        }
        else {
            setIsLoading(false);
        }
    }, [router]);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;

        if (name === "email") {
            setEmail(value);

            if (!isTouched) {
                setIsTouched(true);
            }
            setIsValid(emailPattern.test(value));
        }

        if(name === "password") {
            setPassword(value);
        }
    };


    async function login(event: any) {
        event.preventDefault();
        try {
            setIsLoading(true);

            await pb.collection('users').authWithPassword(email, password)

            if(!pb.authStore.isValid) {
                setHasError(true);
                setErrorMessage("Existing login token is invalid please login.");
                setIsLoading(false);
            }
            else{
                setHasError(false);
                setErrorMessage('')

                router.push('/overview');
            }

        }
        catch (error) {
            console.error(error);
            setHasError(true);

            // Ignore stinky errors
            if(error.status == 400) {setErrorMessage("Invalid login credentials.");}
            if(error.status == 404) {setErrorMessage("Something went wrong, Please try again later or contact an administrator.");}

            setIsLoading(false);
        }

    }

    if(isLoading) {
        return <div className='p-28 mt-24'> 
        <Loader />
    </div>
    }

    return <main className="flex flex-col content-center flex-wrap">
        <form method='post' onSubmit={login}>
            <div className="flex flex-col w-80 content-center flex-wrap border-solid border border-slate-300/15 rounded-xl p-4 mt-16">
                <h1 className="text-3xl font-bold">Login</h1>
                <label className="pt-1 pb-4">Enter your email and password</label>

                <div className="flex flex-col flex-wrap">
                    <label className="" htmlFor="email">Email</label>
                    <input
                        className={`border-solid border rounded-md bg-transparent h-10 text-lg p-2 transition duration-200 focus:bg-slate-50 focus:text-black 
                            focus-visible:outline-none ${isTouched ? isValid ? 'focus:border-green-500 border-slate-300/15' : 'border-red-500' : 'border-slate-300/15'}`}
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="You@example.com"
                        required
                    />
                    <label className="w-max mt-2" htmlFor="password">Password</label>
                    <input
                        className="border-solid border border-slate-300/15 rounded-md bg-transparent h-10 text-lg p-2 transition duration-200 
                        focus:bg-white focus:text-black focus-visible:outline-none"
                        id="password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="**********"
                        required
                    />
                    { hasError && <label className='text-sm text-red-500 text-center w-52 mx-auto mt-2'>{errorMessage != '' ? errorMessage : "An unkown error has occured during the login process!"}</label> }
                </div>
                <button className="border-solid border rounded-xl mx-12 py-4 mt-4 border-slate-300/15">
                    submit
                </button>
            </div>
        </form>
    </main>
}
