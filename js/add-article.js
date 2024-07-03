import PocketBase from 'https://unpkg.com/pocketbase?module';

const pocketbaseUrl = 'https://pocketbase.shdevsrvr.xyz';
const pb = new PocketBase(pocketbaseUrl);

document.getElementById('add-article-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const displayname = document.getElementById('displayname').value;
    const url = document.getElementById('url').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const successMessageDiv = document.getElementById('success-message');

    successMessageDiv.textContent = ''; // Clear previous success messages

    try {
        await pb.collection('articles').create({
            displayname,
            url,
            category,
            description
        });
        successMessageDiv.textContent = 'Article successfully added!';
    } catch (error) {
        successMessageDiv.textContent = 'Error adding article. Please try again.';
    }
});

document.getElementById('analytics-button').addEventListener('click', () => {
    window.location.href = 'analytics.html';
});

document.getElementById('home-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});