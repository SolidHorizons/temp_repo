const links = [
    { url: 'https://openweb.shdevsrvr.xyz/', description: "SH's private openweb ai", display: 'SH Openweb', category: 'General' },
    { url: 'https://github.com/Shrimpey304/shdevsrvr/', description: "dev server's github", display: 'SH dev git repository', category: 'General' },
    { url: 'https://www.stackoverflow.com', description: 'Programming Q&A', display: 'stackoverflow', category: 'Website' }
];


function insertLinks(linkList, containerId) {
    
    const categories = {};
    linkList.forEach(link => {
        if (!categories[link.category]) {
            categories[link.category] = [];
        }
        categories[link.category].push(link);
    });

    
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 

    
    for (const category in categories) {
        
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'category-container';

        
        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        categoryContainer.appendChild(categoryTitle);

        
        categories[category].forEach(linkObj => {
            
            const linkEntry = document.createElement('div');
            linkEntry.className = 'link-entry';

            
            const anchor = document.createElement('a');
            anchor.href = linkObj.url; 
            anchor.textContent = linkObj.display || linkObj.url; 
            anchor.target = '_blank'; 

            
            const description = document.createElement('span');
            description.className = 'link-description';
            description.textContent = ` - ${linkObj.description}`; 

           
            linkEntry.appendChild(anchor);
            linkEntry.appendChild(description);

           
            categoryContainer.appendChild(linkEntry);
        });

        
        container.appendChild(categoryContainer);
    }
}


function filterLinks(event) {
    const query = event.target.value.toLowerCase();
    const filteredLinks = links.filter(link => 
        link.description.toLowerCase().includes(query) ||
        link.category.toLowerCase().includes(query) ||
        link.display.toLowerCase().includes(query)
    );
    insertLinks(filteredLinks, 'link-container');
}

insertLinks(links, 'link-container');

document.getElementById('search-input').addEventListener('input', filterLinks);