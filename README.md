# SPHERE : The Connections Beyond World ( A Social Media Application)

Welcome to the **Sphere The Connections Beyond World** project! This repository hosts a modern social media platform designed to help users **connect, share, and 
engage** with friends and communities. Leveraging a **MERN stack architecture** and rich **interactive features**, Sphere ensures users can share posts, follow 
friends, like and comment on content, and explore analytics in an intuitive and seamless way.

## Updates :
1. A fully working Search bar which can be used to search up your freinds and other people on database.
2. Light / Dark themes are changed to more vibrant and ascthetic color pallets.
3. Navbar buttons are fully working.

## Note:
1. Only .jpeg/jpg , .png files are supportble to upload.
2. Texting each other with other users is not possible as this webiste is not globally published.
   

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Acknowledgements](#acknowledgements)

## Features

- **User Authentication**: Sign up, login, and secure authentication with JWT.  
- **User Profiles**: View and edit profile information, profile picture.
- **Post Creation**: Create, and delete posts with text and media.  
- **Engagement**: Like, comment, posts.  
- **Friend/Follow System**: Follow friends, accept/reject requests, and explore connections.  
- **Analytics**: Track profile views and post impressions with interactive widgets.  
- **Real-time Feed**: See posts from friends and trending content.  
- **Responsive Design**: Works smoothly on desktop and mobile devices.

## Prerequisites
Before you begin, ensure you have met the following requirements:

1. **Node.js & npm** (v18+ recommended)  
2. **MongoDB** (local or cloud instance)  
3. **Git** for version control  
4. **A code editor** (e.g., VS Code)  
5. **Basic knowledge of React and Express** for development

## Installation

__Step 1:__ Clone the repository
```bash
git clone https://github.com/YourUsername/Sphere.git
```
__Step 2:__ Navigate to project directory
```bash
cd Sphere
```
__Step 3:__ Install backend dependencies
```bash
cd server
npm install
```
__Step 4:__ Set up environment variables And Create a .env file in the server folder with the following:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url (optional)
```
__Step 5:__ Start the backend server
```bash
npm run dev
or
node index.js
```
__Step 6:__ Install frontend dependencies
```bash
cd ../client
npm install
```
__Step 7:__ Start the frontend
```bash
npm start
```
## Usage
1. Open the app in your browser at http://localhost:3000.

2. Sign up or log in to create your account.

3. Navigate through the feed, profile, and friends list.

4. Create posts by adding text or images/videos.

5. Engage with posts by liking, commenting, or sharing.

6. Check your profile analytics for views and impressions.

7. Explore other users and follow friends to see their updates in your feed.

8. To stop the backend server, press Ctrl + C in the terminal.

## Project Structure
```
Sphere/
├── client/ # React frontend
│ ├── public/
│ │ └── index.html # Main HTML file
│ ├── src/
│ │ ├── assets/ # Images, icons, media
│ │ ├── components/ # Reusable React components
│ │ ├── pages/ # Pages like Feed, Profile, Login
│ │ ├── state/ # Redux slices & store
│ │ ├── App.js # Main App component
│ │ └── index.js # Entry point for React
│ └── package.json # Frontend dependencies
├── server/ # Express backend
│ ├── controllers/ # API controllers
│ ├── middleware/ # Authentication & error handling
│ ├── models/ # MongoDB schemas
│ ├── routes/ # Express routes
│ ├── utils/ # Helper functions
│ ├── .env # Environment variables
│ └── server.js # Backend entry point
├── .gitignore # Files to ignore in Git
└── README.md # Project documentation

```
## Technologies Used

- **Frontend**:  
  - React.js  
  - Material-UI (MUI)  
  - Redux Toolkit  

- **Backend**:  
  - Node.js  
  - Express.js  

- **Database**:  
  - MongoDB  

- **Authentication & Security**:  
  - JWT (JSON Web Tokens)  
  - bcrypt  

- **Media & Storage**:  
  - Cloudinary (optional)  

- **Other Libraries**:  
  - Axios (API calls)  
  - react-router-dom (routing)  
  - Formik & Yup (form validation)  

- **Core Features**:  
  - User signup/login/logout  
  - Profile management  
  - Post creation, edit, delete  
  - Likes, comments, shares  
  - Friends/follow system  
  - Profile analytics (views & impressions)  
  - Responsive UI
 
## Acknowledgements

- [Material-UI](https://mui.com/) – For providing a modern and responsive React UI framework.  
- [React.js Documentation](https://reactjs.org/docs/getting-started.html) – For React guidance and best practices.  
- [Redux Toolkit](https://redux-toolkit.js.org/) – For state management patterns and examples.  
- [MongoDB](https://www.mongodb.com/) – For database design and queries.  
- [Multer](https://github.com/expressjs/multer) – For handling file uploads in Node.js.  
- [Stack Overflow](https://stackoverflow.com/) – For community support and coding solutions.


