const links = [
    { url: 'https://openweb.shdevsrvr.xyz/', description: "SH's private openweb ai" },
    { url: 'https://github.com/Shrimpey304/shdevsrvr/', description: "dev server's github" },
    { url: 'https://www.stackoverflow.com', description: 'Programming Q&A' }
];


function insertLinks(linkList, containerId) {

    const container = document.getElementById(containerId);
    

    linkList.forEach(linkObj => {

        const linkEntry = document.createElement('div');
        linkEntry.className = 'link-entry';


        const anchor = document.createElement('a');
        anchor.href = linkObj.url; 
        anchor.textContent = linkObj.url;
        anchor.target = '_blank'; 


        const description = document.createElement('span');
        description.className = 'link-description';
        description.textContent = ` - ${linkObj.description}`; 

   
        linkEntry.appendChild(anchor);
        linkEntry.appendChild(description);

        container.appendChild(linkEntry);
    });
}

insertLinks(links, 'link-container');