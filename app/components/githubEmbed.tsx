import Image from 'next/image';

export default function GitHubEmbed(props: any) {
    return <div className="bg-gradient-to-r from-gray-500 to-gray-600 w-full h-8">
        <div className="mt-2 mx-2 flex flex-row">
            <Image
            className=''
                src={props.src}
                alt={props.alt ? props.alt : "GitHub Icon"}
                width={props.width}
                height={props.height}
            />
            <label>{props.GitHubRepository ? props.GitHubRepository : "Repository Name"}</label>
        </div>
    </div>
}