"use client";

import Loader from '@/app/components/loader';
import { useState } from 'react';

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);

    // if(isLoading){
    //     return <div className='flex flex-row justify-center p-28 mt-24'> 
    //                 <Loader />
    //             </div>
    // }

    return <main className='max-w-full p-2 m-4 min-h-72 inset-0 bg-black bg-opacity-25 border-slate-300/15 border rounded-xl'>
        <label className='text-lg'>Recent GitHub Activity</label>
        {/* Funny Line */} <hr />
        <label className='text-lg'>Quick Links</label>
        {/* Funny Line */} <hr />
    </main>
}