# [MERN] Tech Blog - Kien Tech

## Description

MEAN Tech Blog is a full-stack blogging platform built using the MEAN stack (MongoDB, Express.js, Angular, and Node.js). It allows users to create, manage, and interact with blog posts while implementing authentication and authorization mechanisms. Additionally, the platform supports powerful search and filtering features to enhance user experience.

## Features

### 1. Authentication
- Users can register and log in to the platform using their credentials.
- Passwords are securely hashed using bcrypt.
- JSON Web Tokens (JWT) are used for secure session handling.
  
### 2. Authorization
- Role-based access control (RBAC) ensures only authorized users can perform specific actions.
- **Admin** role has access to manage all blogs and users.
- **Regular users** can create, read, update, and delete their own blogs.
  
### 3. CRUD Blog
- **Create**: Users can write and publish new blog posts.
- **Read**: Anyone can view blog posts.
- **Update**: Authors can update their own blog posts.
- **Delete**: Authors can delete their own blog posts.
  
### 4. Blog Management
- Admins can manage all users' blogs, including editing and deleting inappropriate content.
- Admin dashboard for viewing and managing all blogs and users.

### 5. Search and Filter
- Search for blog posts using keywords in titles, content, or tags.
- Filter blogs by categories, authors, or publication date.
  
### 6. Additional Features
- Pagination for blog lists.
- Rich text editor for writing and editing blog content.
- Blog post views tracking and popular blog post section.
- User profile management with the ability to update personal details.

## Tech Stack

- **Frontend**: ReactJs
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **Styling**: Tailwind CSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kientech/mean-tech-blog.git
   cd mean-tech-blog
   ```

2. Install server dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Set up environment variables in the `backend/.env` file:
   ```bash
   # MongoDB URL
   MONGO_URI=your_mongo_database_uri

   # JWT Secret
   JWT_SECRET=your_jwt_secret

   # Port
   PORT=5000
   ```

5. Start the backend server:
   ```bash
   cd backend
   npm run start
   ```

6. Start the frontend Angular application:
   ```bash
   cd frontend
   npm run start
   ```

7. Navigate to `http://localhost:4200` to start using the application.

## Usage

1. **Register**: Create a new account by signing up.
2. **Login**: Use your credentials to log in to your account.
3. **Create a Blog**: Start writing a new blog post from the dashboard.
4. **Manage Blogs**: View, edit, or delete your blogs. Admins can manage all blogs.
5. **Search and Filter**: Easily find blogs using the search and filter options.
6. **Admin Dashboard**: Admin users can manage all content and users.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.