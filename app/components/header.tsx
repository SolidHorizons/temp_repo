import Logo from '@/app/components/logo';

export default function Header() {
    return <header className='flex flex-center items-center border-b border-slate-300/15 mx-4'>
                <Logo alt='Logo Header' width='75' height='75' />
                <label className='text-lg font-semibold'>Dev Panel</label>
            </header>
}