import SVG from '@/public/loader.svg';
import Image from 'next/image';

export default function Loader() {
    return <Image
            src= { SVG }
            alt= 'Loader'
            />
}