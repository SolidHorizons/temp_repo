import Logo from '@/app/components/logo';

export default function Header() {
    return <header className='flex flex-center items-center'>
                <Logo alt='Logo Header' width='75' height='75' />
                <label className='text-lg font-semibold'>Dev Panel</label>
            </header>
}