# InterIntra

InterIntra is a web application designed to help users improve their interpersonal skills through interactive lessons and conversations with a virtual assistant named Sam. The app incorporates gamification elements like streaks and mood tracking to enhance user engagement.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
  - [Accessing the Application](#accessing-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Login and registration system with local data storage.
- **Interactive Lessons**: A lesson tree to navigate through various interpersonal skills lessons.
- **Chat with Sam**: An integrated chat feature where users can converse with Sam, a virtual therapist, to practice their skills.
- **Mood Tracking**: A mood bar representing Sam's mood, which changes based on user interactions.
- **Streak Tracking**: Displays the user's engagement streak using a fire icon and count.
- **Profile Management**: View and edit user profile information.
- **Shop**: Purchase items like XP Boosts and Streak Freezes using in-app currency (XP).
- **Settings**: Logout functionality and access to the privacy policy.

---

## Demo

![InterIntra Screenshot]([images/interintra_screenshot.png](https://github.com/moxifo/HHS_CAC24/blob/main/InterIntra.png))

*Screenshot of the InterIntra application showcasing the main interface.*

---

## Installation

### Prerequisites

- **Node.js** (version 18 or higher recommended)
- **npm** (Node Package Manager)
- **OpenAI API Key**: Required for the chat feature with Sam.

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/moxifo/HHS_CAC24.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd interintra
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**

   - Create a file named `.env` in the project root directory.
   - Add your OpenAI API key to the `.env` file:

     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

   **Important**: Do not share or commit your `.env` file to version control.

5. **Ensure `.env` is Ignored by Git**

   - Add `.env` to your `.gitignore` file:

     ```
     .env
     ```

---

## Usage

### Starting the Server

Run the following command in the project directory:

```bash
node server.js
```

Alternatively, if you have `nodemon` installed:

```bash
nodemon server.js
```

You should see:

```
Server is running on http://localhost:3000
```

### Accessing the Application

- Open your web browser and navigate to `http://localhost:3000`.
- Register a new user account or log in with existing credentials.
- Navigate through the app using the bottom navigation bar.

---

## Project Structure

```
interintra/
├── server.js
├── package.json
├── .env
├── .gitignore
├── index.html
├── styles.css
├── script.js
├── images/
│   └── sam.png
├── fonts/
│   ├── CothamSans.woff
│   └── CothamSans.woff2
```

- **server.js**: Server-side script handling API requests to OpenAI.
- **index.html**: The main HTML file for the app.
- **styles.css**: Contains all the styles for the app.
- **script.js**: Client-side JavaScript for app functionality.
- **images/**: Contains images used in the app (e.g., Sam's image).
- **fonts/**: Custom font files used in the app.

---

## Technologies Used

- **Front-End**:
  - HTML5
  - CSS3
  - JavaScript (ES6)
  - FontAwesome Icons

- **Back-End**:
  - Node.js
  - Express.js
  - OpenAI API

- **Dependencies**:
  - express
  - body-parser
  - dotenv
  - cors

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your message"
   ```

4. **Push to Your Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

---

## License

This project is licensed under the MIT License.

---

## Contact

For any inquiries or issues, please contact:

- **Email**: eugene@gesri.org
- **GitHub**: [moxifo](https://github.com/moxifo)

---

## Acknowledgments

- **OpenAI**: For providing the API that powers the chat feature.
- **FontAwesome**: For the icons used throughout the app.

---

## Additional Information

### Security Considerations

- **API Key Protection**: Your OpenAI API key is stored in the `.env` file and should never be exposed publicly.
- **Local Storage**: User data is stored locally in the browser's `localStorage`. This is suitable for development and testing but consider using a database for production.

### Future Enhancements

- **Password Encryption**: Implement encryption for stored passwords.
- **Database Integration**: Use a database to persist user data securely.
- **Responsive Design Improvements**: Enhance the app's responsiveness on various devices.
- **Accessibility**: Improve accessibility features for users with disabilities.

---

## Frequently Asked Questions (FAQ)

**Q1**: *I get an error saying `Cannot find module 'express'`.*

**A1**: Run `npm install` to install all dependencies.

**Q2**: *How do I obtain an OpenAI API key?*

**A2**: Sign up at [OpenAI's website](https://platform.openai.com/signup/) and generate a new API key in your account settings.

**Q3**: *Can I deploy this app to a live server?*

**A3**: Yes, but ensure that your API keys and sensitive data are securely managed. Consider environment-specific configurations.

---

## Screenshots

*COMING SOON*

---

Thank you for using **InterIntra**! We hope it helps you improve your interpersonal skills in an engaging way.
