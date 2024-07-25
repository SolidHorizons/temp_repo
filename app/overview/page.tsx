"use client";

import Loader from '@/app/components/loader';
import { useEffect, useState } from 'react';
import GitHubEmbed from '@/app/components/githubEmbed';
import { pb } from '@/lib/pocketbase';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true);
    const [repositories, setRepositories] = useState({});

    useEffect(() => {
        if (!pb.authStore.isValid) {
            router.push("/");
        }
        else {
            const fetchData = async () => {
                try {
                    const records = await pb.collection('github_repo').getFullList({
                        sort: '-created',
                        requestKey: null,
                    });


                    // Dont even know what this does atm, Brain is in the deepfryer
                    const repositoryMap: { [key: string]: string } = {};

                    records.forEach(record => {
                        repositoryMap[record['repository_name']] = record['repository_url']
                    })

                    setRepositories(repositoryMap);
                }
                catch (error) {

                }
            }

            fetchData();

        }

    }, []);

    async function fetchFollowedRepositories() {
        const repos: Record<string, string> = {};

        try {
            const records = await pb.collection('github_repo').getFullList({
                sort: '-created',
                requestKey: null,
            });

            // Use forEach instead of map since we don't need the returned array
            records.forEach((repo) => {
                repos[repo['repository_name']] = repo['repository_url'];
            });

            return repos;
        } catch (error) {
            console.error('Error fetching repositories:', error);
        }
    }


    // if(isLoading){
    //     return <div className='flex flex-row justify-center p-28 mt-24'> 
    //                 <Loader />
    //             </div>
    // }

    return <main className='max-w-full p-2 m-4 min-h-72 inset-0 bg-black bg-opacity-25 border-slate-300/15 border rounded-xl flex flex-col flex-wrap'>
        <label className='text-lg min-w-full'>Recent GitHub Activity</label>
        {/* Funny Line */} <hr className='min-w-full mb-2' />
        {/* {fetchFollowedRepositories().map((record) => {

        })} */}
        { /* TODO: Implement code so that we can just pull recent activity from github. Then use a map or whatever.  */}
        <GitHubEmbed src="https://avatars.githubusercontent.com/u/166910768?v=4" alt="Avatar " width="40" height="40" />
        <label className='text-lg min-w-full'>Quick Links</label>
        {/* Funny Line */} <hr className='min-w-full' />
    </main>
}