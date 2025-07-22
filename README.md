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

Soon...

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

