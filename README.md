# Book Exchange App

## Overview
The **Book Exchange App** is a platform that allows users to trade books with others, search for books, write and read reviews, and manage exchanges efficiently. The application consists of a **React frontend** styled with **Tailwind CSS and ShadCN**, and a **Node.js + Express backend** with **MongoDB**.

## Features
### User Authentication
- User registration and login with **JWT authentication**
- Secure password hashing with **bcrypt.js**

### Book Management
- Users can **add books** they own to the exchange system
- **Search for books** by title, author, or ISBN

### Book Exchange System
- Users can request **trades** by specifying books they want and books they offer
- Trade requests can be **accepted or rejected**

### Reviews
- Users can **write reviews** and **rate books**
- Reviews are stored with timestamps and usernames

### Responsive Navigation
- **Navbar** with a **hamburger menu** for mobile responsiveness
- **Links** to Home, Search, Trades, Exchange, Reviews, Login/Register

## Tech Stack
### Frontend:
- **React.js**
- **Tailwind CSS**
- **ShadCN (UI components)**
- **React Router** for navigation

### Backend:
- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose ORM**
- **bcrypt.js** for password hashing
- **jsonwebtoken (JWT)** for authentication


