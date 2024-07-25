import Image from 'next/image';

export default function GitHubEmbed(props: any) {
    return <div className="bg-gradient-to-r p-2 from-gray-500 to-gray-600 w-full h-8v rounded-lg">
        <div className="flex flex-row ">
            <Image
            className=''
                src={props.src}
                alt={props.alt ? props.alt : "GitHub Icon"}
                width={props.width}
                height={props.height}
                unoptimized
            />
            <label>{props.GitHubRepository ? props.GitHubRepository : "Repository Name"}</label>
        </div>
    </div>
}