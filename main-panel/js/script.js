import PocketBase from 'https://unpkg.com/pocketbase?module';

const pocketbaseUrl = 'https://pocketbase.shdevsrvr.xyz';
const pb = new PocketBase(pocketbaseUrl);

// Links with descriptions, display strings, and categories
const links = [
    { url: 'https://openweb.shdevsrvr.xyz/', description: "SH's private openweb ai", display: 'SH Openweb', category: 'General' },
    { url: 'https://github.com/Shrimpey304/shdevsrvr/', description: "dev server's github", display: 'SH dev git repository', category: 'General' },
    { url: 'https://www.stackoverflow.com', description: 'Programming Q&A', display: 'stackoverflow', category: 'Website' },
    { url: 'https://pocketbase.shdevsrvr.xyz/_/', description: 'Dev database', display: 'Development Database', category: 'General' },
];

// Function to create and insert links
function insertLinks(linkList, containerId) {
    const categories = {};
    linkList.forEach(link => {
        if (!categories[link.category]) {
            categories[link.category] = [];
        }
        categories[link.category].push(link);
    });

    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing content

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

// Function to filter links based on search input
function filterLinks(event) {
    const query = event.target.value.toLowerCase();
    const filteredLinks = links.filter(link =>
        link.description.toLowerCase().includes(query) ||
        link.category.toLowerCase().includes(query) ||
        link.display.toLowerCase().includes(query)
    );
    insertLinks(filteredLinks, 'link-container');
}

// Handle authentication click
document.getElementById('auth-button').addEventListener('click', () => {
    window.location.href = 'login.html';
});

// Initialize the links and search functionality if logged in
if (pb.authStore.isValid) {
    document.getElementById('auth-button').textContent = 'Logout';
    document.getElementById('nav-username').textContent = pb.authStore.model.username; // Replace 'username' with the actual field containing the username
    document.getElementById('link-container').classList.remove('hidden');
    document.getElementById('auth-button').onclick = () => {
        pb.authStore.clear();
        document.getElementById('auth-button').textContent = 'Login';
        document.getElementById('nav-username').textContent = '';
        document.getElementById('link-container').classList.add('hidden');
        document.getElementById('search-input').disabled = true;
    };
    document.getElementById('search-input').disabled = false;
} else {
    document.getElementById('search-input').disabled = true;
}

document.getElementById('search-input').addEventListener('input', filterLinks);

// Insert links when the user is logged in
if (pb.authStore.isValid) {
    insertLinks(links, 'link-container');
}