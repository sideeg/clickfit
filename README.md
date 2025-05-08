# Click Fit - A Fun Full-Stack Mini-Project

Hey there, fellow dev! 👋

Welcome to Click Fit! This little project was born out of a fun and fast-paced skills challenge, and I decided to build it out a bit to serve as a neat example of a simple full-stack application. My hope is that it can be a useful starting point or a source of inspiration for students learning web development, or for anyone looking to tinker with a project that combines a bit of frontend flair with a Node.js backend and a touch of database interaction.

## So, What Is It?

Click Fit is a single-page, sports-themed website. It's designed to be a basic but functional demonstration of a few key web technologies working together. Here’s a quick rundown of what it does:

- **Engaging UI:** A clean, responsive interface built with HTML, CSS, and Bootstrap. I tried to make it look decent and work well on different screen sizes.
- **Fun Fact Fetcher:** On page load, it grabs an interesting historical fact for the current day (specifically January 30th, as per the original challenge) from the [Numbers API](http://numbersapi.com) using an AJAX call. A little something to make you go "Huh, neat!"
- **Image Uploader:** You can upload your fitness progress pics (or any images, really!) using a drag-and-drop area or by clicking to select files. The backend (Node.js with Express and Multer) handles these uploads and saves the images.
- **Basic Animations:** Some subtle animations are sprinkled in to make the user experience a bit more dynamic.
- **Database Script:** There's a `db_setup.sql` script included to create a `users` table and a stored procedure for adding new users in a MySQL database. This part is more of a backend setup demonstration than a fully integrated feature in the current UI.

## Why I Built This (The Motivation!)

This project started as a skills showcase – a quick challenge to put various web development concepts into practice. I really enjoyed working on it and thought, "Hey, this could actually be a decent little boilerplate or learning tool for others!"

My main goals were:

1.  **To have fun:** Coding should be enjoyable, and building something from scratch, even something small, is always rewarding.
2.  **To demonstrate a simple full-stack flow:** From frontend interactions (HTML, CSS, JS, jQuery, Bootstrap) to a backend API (Node.js, Express) handling file uploads, and a nod to database setup (MySQL).
3.  **To create a potential launchpad:** I imagine students or aspiring developers could take this code, play with it, break it, fix it, and most importantly, expand upon it. Want to add actual user accounts? Full CRUD for workout logs? A more complex API integration? Go for it! This could be the seed for a much larger, real-world application – maybe even something that generates a bit of income if developed further!

Think of it as a friendly, open invitation to explore and build.

## Tech Stack

Here’s a list of the main technologies and libraries used:

- **Frontend:**
  - HTML5
  - CSS3 (with custom styles in `css/style.css`)
  - JavaScript (ES6+)
  - jQuery (for AJAX and DOM manipulation)
  - Bootstrap 5 (for responsive layout and components)
  - Font Awesome (for icons)
- **Backend:**
  - Node.js
  - Express.js (for the web server and routing)
  - Multer (for handling `multipart/form-data`, primarily for file uploads)
- **Database:**
  - MySQL (the `db_setup.sql` script is written for MySQL)

## Getting Started / How to Run It Locally

Alright, let's get this thing running on your machine!

**Prerequisites:**

- **Node.js and npm:** Make sure you have Node.js installed. npm comes with it. You can grab it from [nodejs.org](https://nodejs.org/).
- **MySQL Server:** You'll need a MySQL server running if you want to use the database script. (For just the frontend and image upload, MySQL isn't strictly needed for the app to _run_, but the script is there for completeness).

**Steps:**

1.  **Clone or Download:** Get the project files onto your computer.
    ```bash
    # If you have git
    # git clone https://github.com/sideeg/clickfit
    # Otherwise, just download and extract the zip file.
    ```
2.  **Navigate to the Project Directory:** Open your terminal/command prompt and `cd` into the `click-fit` folder.
    ```bash
    cd path/to/click-fit
    ```
3.  **Install Dependencies:** This is important! It installs all the Node.js packages needed for the backend (like Express and Multer).
    ```bash
    npm install
    ```
4.  **Start the Server:**

    ```bash
    node server.js
    ```

    You should see a message like: `Server running at http://0.0.0.0:3000/`

5.  **Open in Your Browser:** Open your favorite web browser and go to:
    `http://localhost:3000`

    And that's it! The Click Fit website should be up and running.

**Database Setup (Optional, but good to know):**

1.  Connect to your MySQL server (using MySQL Workbench, DBeaver, command line, etc.).
2.  Create a database if you don't have one you want to use:
    ```sql
    CREATE DATABASE click_fit_db;
    USE click_fit_db;
    ```
3.  Run the commands in the `db_setup.sql` file. This will create the `users` table and the `addUser` stored procedure.

## Folder Structure

Here’s a quick look at how things are organized:

```
click-fit/
├── css/
│   └── style.css         # Your custom styles
├── js/
│   └── script.js         # Custom JavaScript & jQuery magic
├── upload_images/        # Where uploaded images will be saved (created automatically by the server)
├── index.html            # The main (and only) HTML page
├── server.js             # The Node.js backend server
├── package.json          # Lists project dependencies for npm
├── package-lock.json     # Records exact versions of dependencies
└── db_setup.sql          # MySQL script for table and procedure creation
```

## Known Quirks & Future Ideas

- **Public URL Instability:** During development in the original test environment, getting a stable public URL for testing was a bit tricky. So, local testing is your best bet for a smooth experience!
- **Error Handling:** It's pretty basic. A real-world app would need much more robust error handling on both client and server sides.
- **Security:** This is a demo, so security aspects (like input sanitization beyond basic checks, CSRF protection, etc.) haven't been a primary focus. **Don't use this as-is for a production app handling sensitive data without significant security hardening!**

**Some ideas for taking this further:**

- Full user authentication (login, registration using the `users` table).
- A dashboard for logged-in users to track workouts or progress.
- More API integrations (weather for outdoor activities, fitness trackers, etc.).
- A more dynamic way to display content instead of just placeholders.
- Unit and integration tests!

## Contributing (or Just Playing Around!)

Feel free to fork this, clone it, tear it apart, and build something awesome with it. If you find bugs or have ideas for simple improvements to this base, I'd be curious to hear them (though this was primarily a one-off challenge project for me).

Most importantly, have fun coding!
