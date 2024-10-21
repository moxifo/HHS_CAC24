// User Data Management
let userData = {
    username: '',
    password: '',
    streakLength: 0,
    xp: 0,
    joinedDate: '',
    items: [],
    mood: 50 // Initial mood percentage
};

// Function to initialize user data
function initializeUserData() {
    if (localStorage.getItem('currentUser')) {
        userData = JSON.parse(localStorage.getItem('currentUser'));
    } else {
        // Redirect to login if not logged in
        document.getElementById('login-screen').style.display = 'block';
        document.querySelector('.main-content').classList.add('hidden');
        document.querySelector('.bottom-nav').classList.add('hidden');
        return;
    }
    updateStreakDisplay();
    updateMoodBar();
}

// Function to display profile data
function displayProfileData() {
    document.getElementById('profile-username').innerText = userData.username;
    document.getElementById('profile-streak').innerText = userData.streakLength;
    document.getElementById('profile-xp').innerText = userData.xp;
    document.getElementById('profile-joined').innerText = userData.joinedDate;
}

// Function to update streak display
function updateStreakDisplay() {
    document.getElementById('streak-count').innerText = userData.streakLength;
}

// Function to update mood bar
function updateMoodBar() {
    const moodLevel = document.getElementById('mood-level');
    const moodPercentage = userData.mood || 50; // Default mood is 50%
    moodLevel.style.width = moodPercentage + '%';
}

// Function to show the Profile section
function showProfile() {
    hideAllSections();
    document.getElementById('profile').classList.remove('hidden');
    setActiveNavItem('Profile');
    displayProfileData();
}

// Function to show the Shop section
function showShop() {
    hideAllSections();
    document.getElementById('shop').classList.remove('hidden');
    setActiveNavItem('Shop');
}

// Function to show the Settings section
function showSettings() {
    hideAllSections();
    document.getElementById('settings').classList.remove('hidden');
    setActiveNavItem('Settings');
}

// Function to show the Chat section
function showChat() {
    hideAllSections();
    document.getElementById('chat').classList.remove('hidden');
    setActiveNavItem('Chat');
}

// Function to hide all sections
function hideAllSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
}

// Function to set active navigation item
function setActiveNavItem(activeItem) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        const itemText = item.querySelector('span').innerText.trim();
        if (itemText === activeItem) {
            item.classList.add('active');
        }
    });
}

// Function to show the Home (Lessons) section
function showHome() {
    hideAllSections();
    document.getElementById('lessons').classList.remove('hidden');
    setActiveNavItem('Home');
}

// Function to open a lesson
function openLesson(lessonName) {
    alert('Opening lesson: ' + lessonName);
    // Implement lesson loading logic here
}

// Function to open the Edit Profile modal
function openEditProfile() {
    document.getElementById('edit-username').value = userData.username;
    document.getElementById('edit-password').value = '';
    document.getElementById('edit-profile-modal').style.display = 'block';
}

// Function to close the Edit Profile modal
function closeEditProfile() {
    document.getElementById('edit-profile-modal').style.display = 'none';
}

// Function to save the updated profile information
function saveProfile(event) {
    event.preventDefault();
    const newUsername = document.getElementById('edit-username').value.trim();
    const newPassword = document.getElementById('edit-password').value;

    if (newUsername === '') {
        alert('Username cannot be empty.');
        return;
    }

    // Update userData
    userData.username = newUsername;
    if (newPassword !== '') {
        userData.password = newPassword;
    }

    // Update users array in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.username === userData.username);

    if (userIndex !== -1) {
        users[userIndex] = userData;
    } else {
        users.push(userData);
    }

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(userData));

    displayProfileData();
    closeEditProfile();
    alert('Profile updated successfully!');
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('edit-profile-modal');
    if (event.target === modal) {
        closeEditProfile();
    }
};

// Function to handle login
function login(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (username === '' || password === '') {
        alert('Please enter both username and password.');
        return;
    }

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user exists
    const user = users.find(u => u.username === username);

    if (user) {
        // User exists, check password
        if (user.password === password) {
            userData = user;
            localStorage.setItem('currentUser', JSON.stringify(userData));
            startApp();
        } else {
            alert('Incorrect username or password.');
        }
    } else {
        // New user registration
        userData.username = username;
        userData.password = password;
        userData.joinedDate = new Date().toISOString().split('T')[0];
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(userData));
        alert('Account created successfully!');
        startApp();
    }
}

// Function to start the app after login
function startApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.querySelector('.main-content').classList.remove('hidden');
    document.querySelector('.bottom-nav').classList.remove('hidden');
    initializeUserData();
    displayProfileData();
    showHome();
}

// Function to buy an item from the shop
function buyItem(itemName) {
    let itemCost;
    switch (itemName) {
        case 'xpBoost':
            itemCost = 100;
            break;
        case 'streakFreeze':
            itemCost = 200;
            break;
        default:
            itemCost = 0;
    }

    if (userData.xp >= itemCost) {
        userData.xp -= itemCost;
        userData.items.push(itemName);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        updateUserInUsersArray();
        alert('You have purchased ' + itemName + '!');
        displayProfileData();
    } else {
        alert('Not enough XP to purchase this item.');
    }
}

// Helper function to update userData in users array
function updateUserInUsersArray() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.username === userData.username);
    if (userIndex !== -1) {
        users[userIndex] = userData;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Function to logout
function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}

// Function to show privacy policy
function showPrivacyPolicy() {
    alert('Privacy Policy: Your data is stored locally on your device.');
}

// Function to send a chat message
function sendMessage() {
    const messageInput = document.getElementById('chat-message');
    const message = messageInput.value.trim();
    if (message === '') return;

    // Display user's message
    displayChatMessage('user', message);
    messageInput.value = '';

    // Prepare the assistant prompt
    const assistantPrompt = `Pretend you are a therapist who is supposed to help me improve my interpersonal skills. Rate my message and provide feedback.`;

    // Call the assistant
    getChatbotResponse(assistantPrompt + '\nUser: ' + message);
}

// Function to handle pressing Enter key in chat input
function sendMessageOnEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Function to display chat messages
function displayChatMessage(sender, message) {
    const chatContent = document.getElementById('chat-content');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    const messageText = document.createElement('p');
    messageText.innerText = message;
    messageDiv.appendChild(messageText);
    chatContent.appendChild(messageDiv);
    chatContent.scrollTop = chatContent.scrollHeight;
}

// Function to get chatbot response
function getChatbotResponse(userInput) {
    // Show typing indicator
    displayChatMessage('assistant', 'Typing...');

    // Call the server-side API
    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Remove typing indicator
        const chatContent = document.getElementById('chat-content');
        chatContent.removeChild(chatContent.lastChild);

        // Display assistant's message
        displayChatMessage('assistant', data.reply);

        // Update mood based on feedback (simple example)
        if (data.rating !== undefined) {
            userData.mood = Math.min(Math.max(userData.mood + data.rating, 0), 100);
            updateMoodBar();
            localStorage.setItem('currentUser', JSON.stringify(userData));
            updateUserInUsersArray();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Remove typing indicator
        const chatContent = document.getElementById('chat-content');
        chatContent.removeChild(chatContent.lastChild);
        displayChatMessage('assistant', 'Sorry, something went wrong.');
    });
}

// Initialize the app on window load
window.onload = function() {
    if (localStorage.getItem('currentUser')) {
        startApp();
    } else {
        document.getElementById('login-screen').style.display = 'block';
    }
};




