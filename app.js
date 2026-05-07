const express = require('express');
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const seed = require('./seed')
const Movie = require('./models/movies');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;

require('dotenv').config()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const { GoogleGenAI } = require("@google/genai") ;
const ai = new GoogleGenAI({ apiKey: process.env.OPENAI_API_KEY });

mongoose.connect(process.env.MONGO_URL)

// seed();

app.get('/', async(req, res)=> {
    const { q } = req.query;
    const filter = q
        ? {
            $or: [
                { Name: { $regex: q, $options: 'i' } },
                { Desc: { $regex: q, $options: 'i' } },
                { Genres: { $regex: q, $options: 'i' } },
                { Director: { $regex: q, $options: 'i' } }]
        }
        : {};
    
    const allMovies = await Movie.find(filter);
    const homeMovies = await Movie.find();

    const withStats = (movie) => {
        const ratings = movie.Reviews.map((review) => Number(review.rating)).filter((rating) => !Number.isNaN(rating));
        const reviewCount = ratings.length;
        const avgRating = reviewCount
            ? ratings.reduce((sum, rating) => sum + rating, 0) / reviewCount
            : 0;

        return { movie, reviewCount, avgRating };
    };

    const movieStats = homeMovies.map(withStats);
    const filterMovies = allMovies.map(withStats);

    // console.log(movieStats);
     
    const trendingMovies = [...movieStats]
        .sort((a, b) => b.avgRating - a.avgRating || b.reviewCount - a.reviewCount)
        .slice(0, 10);
    const mostReviewedMovies = [...movieStats]
        .sort((a, b) => b.reviewCount - a.reviewCount || b.avgRating - a.avgRating)
        .slice(0, 5);
    const latestMovies = [...movieStats].reverse().slice(0, 10);
    let featuredMovie = [];
    for (let i = 0; i < 5; i++){
        const movie = trendingMovies[i]?.movie || homeMovies[i];
        featuredMovie.push(movie);
    }
    const totalReviews = movieStats.reduce((sum, item) => sum + item.reviewCount, 0);

    res.render('index.ejs', {
        filterMovies,
        movieStats,
        homeMovies,
        allMovies,
        q,
        featuredMovie,
        trendingMovies,
        mostReviewedMovies,
        latestMovies,
        totalMovies: homeMovies.length,
        totalReviews
    });
})

app.get('/new', (req, res)=> {
    res.render('addMovie.ejs');
})

app.post('/create', async(req, res) => {
    const { Name, Year, Duration, Image, Director, Genres, Desc, trailer, imdb } = req.body;
    await Movie.create({ Name, Year, Duration, Image, Director, Genres, Desc, trailer, imdb });
    res.redirect('/');
})

app.get('/movies/:id', async(req,res) => {
    const { id } = req.params;
    const m = await Movie.findById(id);
    if (!m) {
        return res.redirect('/');
    }
    res.render('show.ejs',{m});
})

app.delete('/movie/delete/:id',async (req,res)=>{
    const {id}=req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect('/')
})

app.get('/edit/:id', async(req, res)=> {
    const { id } = req.params;
    const m = await Movie.findById(id);
    if (!m) {
        return res.redirect('/');
    }
    res.render('edit.ejs',{m});
})

app.put('/edit/:id', async(req, res)=> {
    const { id } = req.params;
    const { Image, Name, Year, Duration, Director, Genres, Desc, trailer, imdb } = req.body;
    await Movie.findByIdAndUpdate(id,{ Name, Year, Duration, Image, Director, Genres, Desc, trailer, imdb }, { runValidators: true })
    res.redirect(`/movies/${id}`);
})

app.post('/rating/:id', async(req, res)=> {
    const { id } = req.params;
    const { rating, Comment } = req.body;
    const m = await Movie.findById(id);

    if (!m) {
        return res.redirect('/');
    }

    m.Reviews.push({rating,Comment});
    await m.save();
    res.redirect(`/movies/${id}`);
})

app.get('/summary/:id', async (req, res) => {
    const { id } = req.params;
    const m = await Movie.findById(id);
    const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt(m),
    });
    let k = (response.text);
    res.render('show.ejs',{m,k});
})

app.get('/trailer/:id', async (req, res) => {
    const { id } = req.params;
    const m = await Movie.findById(id);
    if (!m || !m.trailer) {
        return res.redirect(`/movies/${id}`);
    }
    let trailer = await m.trailer.replace("watch?v=", "embed/");
    trailer = trailer + '?autoplay=1&mute=0';
    res.render('show.ejs', { m , trailer });
})

app.get('/watch/:id', async (req, res) => {
    const { id } = req.params;
    const m = await Movie.findById(id);
    if (!m || !m.imdb) {
        return res.redirect(`/movies/${id}`);
    }
    let watch = "https://streamimdb.ru/embed/movie/";
    watch += m.imdb;
    res.redirect(watch);
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

function prompt(m){
  return `You are a movie information assistant.

Input:
Movie Name: ${m.Name}
Year of Release: ${m.Year}

Task:
1. Provide a clear and engaging summary of the movie in approximately 200 words.
2. List the main cast members with their character names.

Guidelines:
- Keep the summary concise, informative, and spoiler-aware (avoid major plot twists if possible).
- Ensure the summary is close to 200 words (not too short or too long).
- Include only /important cast members (around 5–10 actors).
- Format the output neatly.

Output Format:

Title: {movie_name} ({year})

Summary:
<200-word summary>

Cast:
- Actor Name as Character Name
- Actor Name as Character Name
- Actor Name as Character Name`
}
