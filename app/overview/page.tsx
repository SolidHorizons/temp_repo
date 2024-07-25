"use client";

import Loader from '@/app/components/loader';
import { useState } from 'react';
import GitHubEmbed from '@/app/components/githubEmbed';

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);

    // if(isLoading){
    //     return <div className='flex flex-row justify-center p-28 mt-24'> 
    //                 <Loader />
    //             </div>
    // }

    return <main className='max-w-full p-2 m-4 min-h-72 inset-0 bg-black bg-opacity-25 border-slate-300/15 border rounded-xl flex flex-col flex-wrap'>
        <label className='text-lg min-w-full'>Recent GitHub Activity</label>
        {/* Funny Line */} <hr className='min-w-full mb-2'/>

        { /* TODO: Implement code so that we can just pull recent activity from github. Then use a map or whatever.  */}
        <GitHubEmbed src="https://avatars.githubusercontent.com/u/132166635?v=4" alt="Github Image" width="50" height="50"/>
        <label className='text-lg min-w-full'>Quick Links</label>
        {/* Funny Line */} <hr className='min-w-full'/>
    </main>
}