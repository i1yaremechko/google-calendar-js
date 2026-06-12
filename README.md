# Google Calendar Clone (Vanilla JS)

A web application that clones the core functionality of Google Calendar. Built as a learning project to master modular architecture with pure JavaScript and integrated data synchronization via a REST API.

## 🔗 Live Demo
[View the Live Project](https://i1yaremechko.github.io/google-calendar-js/)

## 🛠️ Technologies & Tools
- **Vanilla JavaScript** (ES6+ Modules)
- **SCSS** (Sass) with modular structure
- **Prettier / ESLint** (Configured with Airbnb Style Guide)
- **MockAPI** (REST API for full CRUD event synchronization)

## 💡 Features
- **Weekly Calendar Grid:** Dynamic rendering of days, hours, and navigation between weeks.
- **Event Management:** Full CRUD operations (Create, Read, Update, Delete) synchronized with a remote server.
- **Smart Form Validation:** Includes restrictions on event creation and sets specific rules for event duration and overlap.
- **Time Lock for Deletion:** Implements a validation rule that prevents users from deleting an event if there are less than 15 minutes left before it starts.
- **Server Synchronization:** Ensures all data is securely stored and persistently fetched from the backend.

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/i1yaremechko/google-calendar-js.git](https://github.com/i1yaremechko/google-calendar-js.git)
   cd google-calendar-js
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Compile SCSS styles:**
   ```bash
   npm run scss
   ```

4. **Launch the application:**
   ```bash
   Open index.html using the Live Server extension in VS Code or any local static server.
   ```