## 📽️ MovieNerds 🎬

**MovieNerds** is a full-stack MERN (MongoDB, Express, React, Node.js) web app that lets movie enthusiasts discover trending movies, maintain a watchlist, write reviews, and interact with a secure auth system.

---

## 📌 **Features**

✅ Browse trending movies (powered by TMDb API)
✅ Register & Login with secure JWT auth
✅ Add and manage your personal watchlist
✅ Write reviews & ratings for movies
✅ Also users can read other users’ reviews and critic reviews of movies
✅ Protected routes with JWT middleware
✅ Fully responsive UI (React + Tailwind CSS)
✅ Node.js + Express backend with MongoDB database

---

## 🚀 **Tech Stack**

* **Frontend:** React, Tailwind CSS, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Auth:** JWT (JSON Web Token) + bcrypt password hashing
* **API:** TMDb API for movie data

---

## 🗂️ **Project Structure**

```
movie-app/
├── backend/              # Node.js + Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── db.js
│   └── server.js
├── frontend/ (or root)  # React frontend (inside movie-app)
│   ├── src/
│   ├── public/
│   └── ...
└── README.md
```

---

## ⚙️ **Setup Instructions**

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/Ansh283/Best.git
cd Best
```

### 2️⃣ **Install Backend Dependencies**

```bash
cd backend
npm install
```

### 3️⃣ **Install Frontend Dependencies**

```bash
cd ../movie-app
npm install
```

### 4️⃣ **Environment Variables**

Create a `.env` file inside the **backend** folder:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/moviedb
JWT_SECRET=6dm,Bk+8YX7AXXp0ntKJ
JWT_EXPIRES_IN=7d
PORT=5000
```

---

### 5️⃣ **Run the Application**

**Start Backend**

```bash
cd backend
nodemon server.js
```

**Start Frontend**

```bash
cd ../movie-app
npm run dev
```

Visit 👉 [http://localhost:5173](http://localhost:5173) to see it live!

---

## ✅ **API Routes**

| Method | Endpoint                 | Description                  |
| ------ | ------------------------ | ---------------------------- |
| POST   | `/api/auth/register`     | Register new user            |
| POST   | `/api/auth/login`        | Login existing user          |
| POST   | `/api/reviews`           | Add a new review (protected) |
| GET    | `/api/reviews/:movieId`  | Get reviews for a movie      |
| DELETE | `/api/reviews/:reviewId` | Delete your review           |

---

## 🔐 **Authentication**

* JWT-based authentication.
* User passwords hashed with bcrypt.
* Protected routes secured with custom Express middleware.

---

## ✨ **Future Improvements**

* Social feed for movie discussions 🗨️
* Like & comment system on reviews 👍
* Friend connections & community features 🤝
* Better watchlist recommendations 🎯

---

## 📸 **Screenshots**

<img width="1872" height="898" alt="Screenshot 2025-07-22 144256" src="https://github.com/user-attachments/assets/ed4ff09b-1004-4ff0-a94e-97d32355ecc7" />
<img width="1875" height="868" alt="Screenshot 2025-04-17 222357" src="https://github.com/user-attachments/assets/3aec4b52-5f87-4a2e-89dd-6817e00935a1" />
<img width="1886" height="879" alt="Screenshot 2025-04-17 222943" src="https://github.com/user-attachments/assets/4cd5ec05-b042-4f93-935c-2c5701a8d45f" />
<img width="1871" height="835" alt="Screenshot 2025-04-17 223019" src="https://github.com/user-attachments/assets/ebf4dbfb-d6aa-4cf3-8d05-098a56918a44" />
<img width="1874" height="895" alt="Screenshot 2025-04-17 223041" src="https://github.com/user-attachments/assets/b5b92d3c-344a-4445-987c-31a4eb807578" />
<img width="1880" height="896" alt="Screenshot 2025-04-17 221003" src="https://github.com/user-attachments/assets/a3a45e47-d7e3-4d5f-8b18-1a313b80ff58" />







---

## 🤝 **Contributing**

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 **License**

This project is licensed under the MIT License.

---

## 📫 **Contact**

Feel free to connect!
Ansh Pal — [anshvpal@gmail.com](mailto:anshvpal@gmail.com) — [www.linkedin.com/in/ansh-pal-aa4676354](https://www.linkedin.com/in/ansh-pal-aa4676354)

**Happy Movie Nerding! 🍿🎥**

