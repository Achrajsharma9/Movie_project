# CineSphere 🎬

CineSphere is a comprehensive web application that allows users to explore movies, check ratings, discover cast and crew details, and filter movies by genre. The platform fetches real-time movie data using the TMDb API to provide the most up-to-date information.

## 🚀 Live Demo

[CineSphere on Vercel](https://movie-project-seven-chi.vercel.app/)

## ✨ Features

- 🔍 **Search Movies**: Find movies by title with an intuitive search interface
- 🎭 **Movie Details**: View comprehensive information including ratings, genres, runtime, and plot overview
- 👥 **Cast & Crew Information**: Explore detailed cast listings with character names
- 📅 **Release Information**: Check release dates and production companies
- 🎬 **Genre Filtering**: Browse movies by specific genres
- 🌟 **Rating System**: See user ratings from TMDb

## 📸 Screenshots

### Movie Details Page
![Holland Movie Details](./screenshots/holland-details.png)

### Cast Listing
![Holland Movie Cast](./screenshots/holland-cast.png)

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **API Integration**: [TMDb API](https://www.themoviedb.org/documentation/api)
- **Routing**: React Router
- **Deployment**: Vercel

## 📦 Project Structure

```
cinesphere/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── MovieCard/
│   │   ├── MovieDetails/
│   │   ├── CastList/
│   │   ├── SearchBar/
│   │   └── GenreFilter/
│   ├── contexts/
│   │   └── MovieContext.tsx
│   ├── hooks/
│   │   └── useMovieData.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── MoviePage.tsx
│   │   └── Genres.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   └── index.tsx
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🛠 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Achrajsharma9/movie-sphere-explorer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd movie-sphere-explorer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your TMDb API key:
   ```
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 🔮 Future Enhancements

- ✅ **Watchlist Feature**: Allow users to save favorite movies for later viewing
- 🔐 **User Authentication**: Enable personalized experiences with user accounts
- 🎞 **Movie Recommendations**: Suggest movies based on user preferences and viewing history
- 📱 **Mobile App**: Develop native mobile applications for iOS and Android
- 🌙 **Dark/Light Mode**: Implement theme switching functionality
- 🔔 **New Release Notifications**: Alert users when movies they might like are released

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by Achraj Sharma
