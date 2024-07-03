import PocketBase from 'https://unpkg.com/pocketbase?module';

const pocketbaseUrl = 'https://pocketbase.shdevsrvr.xyz';
const pb = new PocketBase(pocketbaseUrl);

async function fetchLinks() {
    try {
        const records = await pb.collection('articles').getFullList({
            sort: '-created',
        });
        return records;
    } catch (error) {
        console.error('Error fetching links:', error);
        return [];
    }
}

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
            anchor.textContent = linkObj.displayname || linkObj.url;
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
    fetchLinks().then(links => {
        const filteredLinks = links.filter(link =>
            link.description.toLowerCase().includes(query) ||
            link.category.toLowerCase().includes(query) ||
            link.displayname.toLowerCase().includes(query)
        );
        insertLinks(filteredLinks, 'link-container');
    });
}

// Handle authentication click
document.getElementById('auth-button').addEventListener('click', () => {
    if (pb.authStore.isValid) {
        pb.authStore.clear();
        window.location.reload();
    } else {
        window.location.href = 'login.html';
    }
});

// Initialize the links and search functionality if logged in
if (pb.authStore.isValid) {
    document.getElementById('auth-button').textContent = 'Logout';
    document.getElementById('nav-username').textContent = pb.authStore.model.username; // Replace 'username' with the actual field containing the username
    document.getElementById('link-container').classList.remove('hidden');
    document.getElementById('search-input').disabled = false;
    document.getElementById('add-article-button').classList.remove('hidden');

    fetchLinks().then(links => {
        insertLinks(links, 'link-container');
    });
} else {
    document.getElementById('search-input').disabled = true;
    document.getElementById('add-article-button').classList.add('hidden');
}

document.getElementById('add-article-button').addEventListener('click', () => {
    window.location.href = 'add-article.html';
});

document.getElementById('search-input').addEventListener('input', filterLinks);