import Image from 'next/image';

import LogoSVG from "@/public/logo.svg"


export default function Logo(props: { alt?: string; width: number | `${number}` | undefined; height:  number | `${number}` | undefined; }) {
    return <Image 
                src= { LogoSVG }
                alt= { props.alt ? props.alt : "Logo"}
                width= { props.width }
                height= { props.height }
            />
}