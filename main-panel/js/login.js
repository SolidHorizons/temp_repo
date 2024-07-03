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
        window.location.href = 'index.html'; // Redirect to main page on success
    } catch (error) {
        errorMessageDiv.textContent = 'Email and password combination does not exist.';
    }
});