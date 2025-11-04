## Gupshup -Real-Time Chat Application

Gupshup is a real time chat application build using MERN(MongoDB,Express.js,React.js,Node.js) stack and WebSocket technology.
It allows user to chat instantly and smoothly using Socket.io.



## Features
- 🔐 User authentication (JWT)
- 💬 Real-time chat with WebSockets
- 📱 Responsive UI
- 👥 private messaging


## Tech Stack
**Frontend:** React, Tailwind CSS,DaisyUI
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Real-time Engine:** Socket.io


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ARGHYADEEP-PATRA/Gupshup.git
2.cd Gupshup
3.cd client && npm install
4.cd server && npm install
5.Create a .env file in the server folder and add:
PORT=your port no
MONGODB_URL=your mongodb url
JWT_SECRET=your jwt secret
JWT_EXPIRE=your jwt expire in days like "2d" "3d" etc
COOKIE_EXPIRE=your cookie expire in days like "2","3" etc
CLIENT_URL=your client url 

6.Create a .env file in client folder also and add:
VITE_DB_URL=the whole url like "originurl/api/v1"
VITE_DB_ORIGIN=origin of the server means in which url server runs


7.Start both server with "npm run dev"



## Usage
1. Register or login with your account.  
3. Start chatting in real-time with others!


  



