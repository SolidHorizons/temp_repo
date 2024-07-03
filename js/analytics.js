import PocketBase from 'https://unpkg.com/pocketbase?module';

const pocketbaseUrl = 'https://pocketbase.shdevsrvr.xyz';
const pb = new PocketBase(pocketbaseUrl);

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessageDiv = document.getElementById('error-message');

    errorMessageDiv.textContent = ''; // Clear any previous error message

    try {
        await pb.collection('users').authWithPassword(username, password);
        
        // Hide the entire analytics-container and show the selection bar and server info
        document.getElementById('analytics-container').classList.add('hidden');
        document.getElementById('selection-bar').classList.remove('hidden');
        document.getElementById('server-info').classList.remove('hidden');
        
        // Initialize the selection bar
        createSelectionBar(); 
        
        // Fetch and display server info
        const apiToken = await getApiKey();
        if (apiToken) {
            fetchServerInfo(apiToken);
            setInterval(() => fetchServerInfo(apiToken), 10000); // Refresh every 10 seconds
        }
    } catch (error) {
        errorMessageDiv.textContent = 'Email or username and password combination does not exist.';
    }
});

document.getElementById('add-article-button').addEventListener('click', () => {
    window.location.href = 'add-article.html';
});

document.getElementById('home-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});

async function getApiKey() {
    try {
        const record = await pb.collection('api_keys').getFirstListItem('site="hetzner.com"');
        return record.api_token;
    } catch (error) {
        console.error('Error fetching API key from PocketBase:', error);
        document.getElementById('error-message').textContent = 'Error fetching API key: ' + (error.message || 'Unknown Error');
        return null;
    }
}

async function fetchServerInfo(apiToken) {
    const apiUrl = 'https://api.hetzner.cloud/v1/servers';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        updateServerInfo(data);
    } catch (error) {
        console.error('Error fetching server info from Hetzner API:', error);
        document.getElementById('error-message').textContent = 'Error fetching server info: ' + (error.message || 'Unknown Error');
    }
}

function updateServerInfo(data) {
    const serverInfoDiv = document.getElementById('server-info');
    serverInfoDiv.innerHTML = '';

    const serverGrid = document.createElement('div');
    serverGrid.className = 'server-grid';
    
    data.servers.forEach(server => {
        const serverDiv = document.createElement('div');
        serverDiv.className = 'server-details';
        
        // Add server details
        serverDiv.innerHTML = `
            <h3>Server: ${server.name}</h3>
            <p>Status: <span class="server-status ${server.status}">${server.status}</span></p>
            <p>Server Type: ${server.server_type.description}</p>
            <p>Public IP: ${server.public_net.ipv4.ip}</p>
            <p>Image: ${server.image.description}</p>
            <p>Datacenter: ${server.datacenter.name}</p>
            <p>Created: ${new Date(server.created).toLocaleString()}</p>
        `;
        
        serverGrid.appendChild(serverDiv);
    });

    serverInfoDiv.appendChild(serverGrid);
}

function createSelectionBar() {
    const selectionBar = document.getElementById('selection-bar');
    selectionBar.classList.remove('hidden');

    // Event listener for the selection bar
    document.getElementById('analytics-options').addEventListener('change', async (event) => {
        const selectedOption = event.target.value;
        if (selectedOption === 'hetzner') {
            const apiToken = await getApiKey();
            if (apiToken) {
                fetchServerInfo(apiToken);
            }
        }
    });
}

// Handle user login status
if (pb.authStore.isValid) {
    document.getElementById('auth-button').textContent = 'Logout';
    document.getElementById('nav-username').textContent = pb.authStore.model.username; // Replace 'username' with the actual field containing the username
    document.getElementById('selection-bar').classList.remove('hidden');
} else {
    document.getElementById('selection-bar').classList.add('hidden');
}

// Handle authentication click
document.getElementById('auth-button').addEventListener('click', () => {
    if (pb.authStore.isValid) {
        pb.authStore.clear();
        window.location.reload();
    } else {
        window.location.href = 'login.html'; // Adjust the URL if needed
    }
});

document.getElementById('add-article-button').addEventListener('click', () => {
    window.location.href = 'add-article.html';
});

document.getElementById('analytics-button').addEventListener('click', () => {
    window.location.href = 'analytics.html';
});