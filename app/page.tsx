"use client";
import Email from '@/app/components/emailinput';

export default function Login() {
 return <main className="flex flex-col content-center flex-wrap">
            <form>
                <div className="flex flex-col w-80 content-center flex-wrap border-solid border border-slate-300/15 rounded-xl p-4 mt-16">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <label className="pt-1 pb-4">Enter your email and password</label>
                    
                    <div className="flex flex-col flex-wrap">
                        <label className="" htmlFor="email">Email</label>
                        <Email
                        />
                        <label className="w-max mt-2" htmlFor="password">Password</label>
                        <input
                        className="border-solid border border-slate-300/15 rounded-md bg-transparent h-10 text-lg p-2 transition duration-200 
                        focus:bg-white focus:text-black focus-visible:outline-none"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        />
                    </div>
                </div>
            </form>
        </main>
}
