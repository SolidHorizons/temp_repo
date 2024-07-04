import PocketBase from 'https://unpkg.com/pocketbase?module';

const pocketbaseUrl = 'https://pocketbase.shdevsrvr.xyz';
const pb = new PocketBase(pocketbaseUrl);

const authButton = document.getElementById('auth-button');
const usernameDisplay = document.getElementById('nav-username');
const generateKeyButton = document.getElementById('generate-key-button');
const makeRequestButton = document.getElementById('make-request-button');
const apiKeyParagraph = document.getElementById('api-key');
const apiKeyContainer = document.getElementById('generated-key');
const apiKeysList = document.getElementById('api-keys-list');
const apiResponseContainer = document.getElementById('api-response');
const responseDataPre = document.getElementById('response-data');

authButton.addEventListener('click', () => {
    if (pb.authStore.isValid) {
        if (confirm("Are you sure you want to logout?")) {
            pb.authStore.clear();
            window.location.reload();
        }
    } else {
        window.location.href = 'login.html';
    }
});

if (pb.authStore.isValid) {
    authButton.textContent = 'Logout';
    usernameDisplay.textContent = pb.authStore.model.username;
    fetchApiKeys();
}

generateKeyButton.addEventListener('click', async () => {
    if (pb.authStore.isValid) {
        const userId = pb.authStore.model.id;
        const generatedKey = generateApiKey();
        try {
            await pb.collection('api_enduser_keys').create({
                user: userId,
                key: generatedKey
            });

            apiKeyParagraph.textContent = '*'.repeat(16); // Anonymize the displayed key
            apiKeyContainer.setAttribute('data-keytext', generatedKey); // Store actual key in a data attribute
            apiKeyContainer.classList.remove('hidden');
            fetchApiKeys();
        } catch (error) {
            console.error('Error generating API key:', error);
            alert('Error generating API key. Please try again.');
        }
    } else {
        alert('You need to be logged in to generate an API key.');
    }
});

function generateApiKey() {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    return array.join('-');
}

async function fetchApiKeys() {
    try {
        const userId = pb.authStore.model.id;
        const keys = await pb.collection('api_enduser_keys').getFullList({
            filter: `user = "${userId}"`,
            sort: '-created'
        });
        updateApiKeysList(keys);
    } catch (error) {
        console.error('Error fetching API keys:', error);
    }
}

function updateApiKeysList(keys) {
    apiKeysList.innerHTML = '';
    keys.forEach(key => {
        const listItem = document.createElement('li');
        const keyText = '*'.repeat(16);  // Default to anonymized key
        listItem.innerHTML = `
            <span class="key-text" data-keytext="${key.key}">${keyText}</span>
            <button class="reveal-key-button">Reveal</button>
            <button class="copy-key-button">Copy</button>
            <button class="delete-key-button">Delete</button>
        `;
        listItem.querySelector('.reveal-key-button').addEventListener('click', toggleKeyVisibility);
        listItem.querySelector('.copy-key-button').addEventListener('click', copyToClipboard);
        listItem.querySelector('.delete-key-button').addEventListener('click', () => deleteKey(key.id));
        apiKeysList.appendChild(listItem);
    });
}

function toggleKeyVisibility(event) {
    const keyTextElement = event.target.parentNode.querySelector('.key-text');
    const isHidden = keyTextElement.textContent.startsWith('*');

    if (isHidden) {
        keyTextElement.textContent = keyTextElement.getAttribute('data-keytext');
        event.target.textContent = 'Hide';
    } else {
        keyTextElement.textContent = '*'.repeat(16);
        event.target.textContent = 'Reveal';
    }
}

function copyToClipboard(event) {
    const keyTextElement = event.target.parentNode.querySelector('.key-text');
    const keyText = keyTextElement.getAttribute('data-keytext');
    navigator.clipboard.writeText(keyText)
        .then(() => alert('API key copied to clipboard.'))
        .catch(error => alert('Failed to copy API key. Please try again.'));
}

async function deleteKey(keyId) {
    if (confirm("Are you sure you want to delete this API key?")) {
        try {
            await pb.collection('api_enduser_keys').delete(keyId);
            fetchApiKeys();  // Refresh the list
        } catch (error) {
            console.error('Error deleting API key:', error);
            alert('Error deleting API key. Please try again.');
        }
    }
}

makeRequestButton.addEventListener('click', async () => {
    const apiKeyElement = apiKeyParagraph;
    const actualKey = apiKeyContainer.getAttribute('data-keytext'); // Get the actual key stored in the data attribute
    if (actualKey) {
        try {
            const response = await fetch('https://your-api-endpoint.example.com/protected-route', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${actualKey}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            responseDataPre.textContent = JSON.stringify(data, null, 2);
            apiResponseContainer.classList.remove('hidden');
        } catch (error) {
            console.error('Error making API request:', error);
            alert('Error making API request. Check console for details.');
        }
    } else {
        alert('You need to generate an API key first.');
    }
});