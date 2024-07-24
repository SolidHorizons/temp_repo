export default function Login() {
 return <main className="flex flex-col content-center flex-wrap">
            <form>
                <div className="flex flex-col w-80 content-center flex-wrap border-solid border border-slate-300/15 rounded-xl p-4 mt-16">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <label className="pt-1 pb-4">Enter your email and password</label>
                    
                    <div className="flex flex-col flex-wrap">
                        <label className="" htmlFor="email">Email</label>
                        <input
                        className="w-max"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="You@example.com"
                        required
                        />
                        <label className="w-max" htmlFor="password">Password</label>
                        <input
                        className="w-max"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        />
                    </div>
                </div>
            </form>
        </main>
}
