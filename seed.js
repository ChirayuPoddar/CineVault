const mongoose = require("mongoose");
const Movie = require('./models/movies');

const reviewSets = {
  excellent: [
    { rating: 5, Comment: "A standout movie with great rewatch value." },
    { rating: 5, Comment: "Beautifully made and easy to recommend." },
    { rating: 4, Comment: "Strong story, memorable scenes, and great pacing." }
  ],
  strong: [
    { rating: 4, Comment: "A very solid watch with impressive moments." },
    { rating: 4, Comment: "Well made and worth watching." },
    { rating: 5, Comment: "One of the best picks in its genre." }
  ],
  mixed: [
    { rating: 3, Comment: "Good ideas, though some parts slow down." },
    { rating: 4, Comment: "Enjoyable overall with a few rough edges." },
    { rating: 3, Comment: "Decent movie for a casual watch." }
  ]
};

const dummyMovies = [
  {
  Name: "Inception",
  Year: 2010,
  Duration: "2h 28min",
  Image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  Director: "Christopher Nolan",
  Genres: "Sci-Fi, Action, Thriller",
  Desc: "A thief who steals corporate secrets through dream-sharing technology is offered a chance to erase his past.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
  imdb: "tt1375666"
},

{
  Name: "Interstellar",
  Year: 2014,
  Duration: "2h 49min",
  Image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  Director: "Christopher Nolan",
  Genres: "Sci-Fi, Adventure, Drama",
  Desc: "A team travels through a wormhole in space to find a future home for humanity.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
  imdb: "tt0816692"
},

{
  Name: "The Dark Knight",
  Year: 2008,
  Duration: "2h 32min",
  Image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  Director: "Christopher Nolan",
  Genres: "Action, Crime, Drama",
  Desc: "Batman faces the Joker, a criminal mastermind spreading chaos across Gotham.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
  imdb: "tt0468569"
},

{
  Name: "Avatar",
  Year: 2009,
  Duration: "2h 42min",
  Image: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
  Director: "James Cameron",
  Genres: "Sci-Fi, Adventure, Fantasy",
  Desc: "A marine explores Pandora and is pulled into a conflict between humans and the native Na'vi.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=5PSNL1qE6VY",
  imdb: "tt0499549"
},

{
  Name: "Titanic",
  Year: 1997,
  Duration: "3h 14min",
  Image: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
  Director: "James Cameron",
  Genres: "Romance, Drama, History",
  Desc: "A love story unfolds aboard the ill-fated RMS Titanic.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=kVrqfYjkTdQ",
  imdb: "tt0120338"
},

{
  Name: "The Matrix",
  Year: 1999,
  Duration: "2h 16min",
  Image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  Director: "Lana Wachowski, Lilly Wachowski",
  Genres: "Sci-Fi, Action",
  Desc: "A hacker discovers reality is a simulation and joins the fight against its controllers.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
  imdb: "tt0133093"
},

{
  Name: "Gladiator",
  Year: 2000,
  Duration: "2h 35min",
  Image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
  Director: "Ridley Scott",
  Genres: "Action, Drama, History",
  Desc: "A Roman general seeks revenge after being betrayed by a corrupt emperor.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=owK1qxDselE",
  imdb: "tt0172495"
},

{
  Name: "Joker",
  Year: 2019,
  Duration: "2h 2min",
  Image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  Director: "Todd Phillips",
  Genres: "Crime, Drama, Thriller",
  Desc: "A troubled performer descends into madness and becomes a criminal icon.",
  Reviews: reviewSets.mixed,
  trailer: "https://www.youtube.com/watch?v=zAGVQLHvwOY",
  imdb: "tt7286456"
},

{
  Name: "Avengers: Endgame",
  Year: 2019,
  Duration: "3h 1min",
  Image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  Director: "Anthony Russo, Joe Russo",
  Genres: "Action, Adventure, Superhero",
  Desc: "The Avengers assemble one last time to reverse Thanos' destruction.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
  imdb: "tt4154796"
},

{
  Name: "Parasite",
  Year: 2019,
  Duration: "2h 12min",
  Image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  Director: "Bong Joon Ho",
  Genres: "Thriller, Drama, Comedy",
  Desc: "A poor family schemes its way into the lives of a wealthy household.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
  imdb: "tt6751668"
  },
{
  Name: "Dune: Part Two",
  Year: 2024,
  Duration: "2h 46min",
  Image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  Director: "Denis Villeneuve",
  Genres: "Sci-Fi, Adventure, Drama",
  Desc: "Paul Atreides unites with the Fremen while seeking revenge against those who destroyed his family.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=Way9Dexny3w",
  imdb: "tt15239678"
},

{
  Name: "Spider-Man: Across the Spider-Verse",
  Year: 2023,
  Duration: "2h 20min",
  Image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
  Director: "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
  Genres: "Animation, Action, Adventure",
  Desc: "Miles Morales travels across the multiverse and meets a team of Spider-People.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=cqGjhVJWtEg",
  imdb: "tt9362722"
},

{
  Name: "Oppenheimer",
  Year: 2023,
  Duration: "3h",
  Image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  Director: "Christopher Nolan",
  Genres: "Biography, Drama, History",
  Desc: "The story of J. Robert Oppenheimer and the creation of the atomic bomb.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
  imdb: "tt15398776"
},

{
  Name: "Barbie",
  Year: 2023,
  Duration: "1h 54min",
  Image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
  Director: "Greta Gerwig",
  Genres: "Comedy, Adventure, Fantasy",
  Desc: "Barbie leaves her perfect world and discovers the messy reality of being human.",
  Reviews: reviewSets.mixed,
  trailer: "https://www.youtube.com/watch?v=pBk4NYhWNMM",
  imdb: "tt1517268"
},

{
  Name: "La La Land",
  Year: 2016,
  Duration: "2h 8min",
  Image: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
  Director: "Damien Chazelle",
  Genres: "Musical, Romance, Drama",
  Desc: "A pianist and an aspiring actor fall in love while chasing their dreams in Los Angeles.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
  imdb: "tt3783958"
},

{
  Name: "Mad Max: Fury Road",
  Year: 2015,
  Duration: "2h",
  Image: "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
  Director: "George Miller",
  Genres: "Action, Adventure, Sci-Fi",
  Desc: "A road warrior and a rebel commander race across a wasteland to escape a tyrant.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=hEJnMQG9ev8",
  imdb: "tt1392190"
},

{
  Name: "The Grand Budapest Hotel",
  Year: 2014,
  Duration: "1h 39min",
  Image: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
  Director: "Wes Anderson",
  Genres: "Comedy, Adventure, Drama",
  Desc: "A hotel concierge and lobby boy become tangled in a theft, chase, and family fortune.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=1Fg5iWmQjwk",
  imdb: "tt2278388"
},

{
  Name: "Get Out",
  Year: 2017,
  Duration: "1h 44min",
  Image: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
  Director: "Jordan Peele",
  Genres: "Horror, Mystery, Thriller",
  Desc: "A weekend visit to meet a girlfriend's parents turns into a horrifying discovery.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=DzfpyUB60YY",
  imdb: "tt5052448"
},

{
  Name: "Everything Everywhere All at Once",
  Year: 2022,
  Duration: "2h 19min",
  Image: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
  Director: "Daniel Kwan, Daniel Scheinert",
  Genres: "Action, Comedy, Sci-Fi",
  Desc: "A laundromat owner is pulled into a wild multiverse battle connected to her family.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=wxN1T1uxQ2g",
  imdb: "tt6710474"
},

{
  Name: "The Social Network",
  Year: 2010,
  Duration: "2h",
  Image: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
  Director: "David Fincher",
  Genres: "Biography, Drama",
  Desc: "The rise of Facebook is told through ambition, friendship, and betrayal.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=lB95KLmpLR4",
  imdb: "tt1285016"
  },
{
  Name: "Coco",
  Year: 2017,
  Duration: "1h 45min",
  Image: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
  Director: "Lee Unkrich, Adrian Molina",
  Genres: "Animation, Family, Music",
  Desc: "A young musician journeys into the Land of the Dead to uncover his family's past.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=Rvr68u6k5sI",
  imdb: "tt2380307"
},

{
  Name: "Whiplash",
  Year: 2014,
  Duration: "1h 46min",
  Image: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
  Director: "Damien Chazelle",
  Genres: "Drama, Music",
  Desc: "A talented drummer faces an intense instructor who pushes him to his limits.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=7d_jQycdQGo",
  imdb: "tt2582802"
},

{
  Name: "Knives Out",
  Year: 2019,
  Duration: "2h 10min",
  Image: "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
  Director: "Rian Johnson",
  Genres: "Mystery, Comedy, Crime",
  Desc: "A detective investigates a novelist's suspicious death inside a wealthy family.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=qGqiHJTsRkQ",
  imdb: "tt8946378"
},

{
  Name: "Arrival",
  Year: 2016,
  Duration: "1h 56min",
  Image: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
  Director: "Denis Villeneuve",
  Genres: "Sci-Fi, Drama, Mystery",
  Desc: "A linguist works to communicate with mysterious visitors before global tensions explode.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=tFMo3UJ4B4g",
  imdb: "tt2543164"
},

{
  Name: "Fight Club",
  Year: 1999,
  Duration: "2h 19min",
  Image: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  Director: "David Fincher",
  Genres: "Drama",
  Desc: "An insomniac office worker forms an underground fight club that spirals out of control.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=SUXWAEX2jlg",
  imdb: "tt0137523"
},

{
  Name: "The Shawshank Redemption",
  Year: 1994,
  Duration: "2h 22min",
  Image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  Director: "Frank Darabont",
  Genres: "Drama",
  Desc: "Two imprisoned men bond over years, finding solace and eventual redemption.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=6hB3S9bIaco",
  imdb: "tt0111161"
},

{
  Name: "Pulp Fiction",
  Year: 1994,
  Duration: "2h 34min",
  Image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  Director: "Quentin Tarantino",
  Genres: "Crime, Drama",
  Desc: "The lives of two mob hitmen and others intertwine in tales of violence.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
  imdb: "tt0110912"
},

{
  Name: "Forrest Gump",
  Year: 1994,
  Duration: "2h 22min",
  Image: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  Director: "Robert Zemeckis",
  Genres: "Drama, Romance",
  Desc: "The presidencies and events of history unfold through the perspective of Forrest.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=bLvqoHBptjg",
  imdb: "tt0109830"
},

{
  Name: "The Godfather",
  Year: 1972,
  Duration: "2h 55min",
  Image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  Director: "Francis Ford Coppola",
  Genres: "Crime, Drama",
  Desc: "The aging patriarch of an organized crime dynasty transfers control to his son.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=sY1S34973zA",
  imdb: "tt0068646"
},

{
  Name: "Se7en",
  Year: 1995,
  Duration: "2h 7min",
  Image: "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg",
  Director: "David Fincher",
  Genres: "Crime, Thriller",
  Desc: "Two detectives hunt a serial killer who uses the seven deadly sins.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=znmZoVkCjpI",
  imdb: "tt0114369"
  },
{
  Name: "The Silence of the Lambs",
  Year: 1991,
  Duration: "1h 58min",
  Image: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
  Director: "Jonathan Demme",
  Genres: "Thriller, Crime",
  Desc: "A young FBI cadet seeks help from an imprisoned cannibal killer.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=W6Mm8Sbe__o",
  imdb: "tt0102926"
},

{
  Name: "Saving Private Ryan",
  Year: 1998,
  Duration: "2h 49min",
  Image: "https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg",
  Director: "Steven Spielberg",
  Genres: "War, Drama",
  Desc: "A group of soldiers go behind enemy lines to retrieve a paratrooper.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=9CiW_DgxCnQ",
  imdb: "tt0120815"
},

{
  Name: "The Prestige",
  Year: 2006,
  Duration: "2h 10min",
  Image: "https://image.tmdb.org/t/p/w500/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg",
  Director: "Christopher Nolan",
  Genres: "Drama, Mystery, Sci-Fi",
  Desc: "Two magicians engage in a bitter rivalry.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=o4gHCmTQDVI",
  imdb: "tt0482571"
},

{
  Name: "The Wolf of Wall Street",
  Year: 2013,
  Duration: "3h",
  Image: "https://image.tmdb.org/t/p/w500/sOxr33wnRuKazR9ClHek73T8qnK.jpg",
  Director: "Martin Scorsese",
  Genres: "Biography, Crime, Drama",
  Desc: "Based on the true story of Jordan Belfort.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=iszwuX1AK6A",
  imdb: "tt0993846"
},

{
  Name: "Django Unchained",
  Year: 2012,
  Duration: "2h 45min",
  Image: "https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg",
  Director: "Quentin Tarantino",
  Genres: "Western, Drama",
  Desc: "A freed slave sets out to rescue his wife.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=eUdM9vrCbow",
  imdb: "tt1853728"
},

{
  Name: "The Batman",
  Year: 2022,
  Duration: "2h 56min",
  Image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  Director: "Matt Reeves",
  Genres: "Action, Crime, Drama",
  Desc: "Batman uncovers corruption in Gotham.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
  imdb: "tt1877830"
},

{
  Name: "John Wick",
  Year: 2014,
  Duration: "1h 41min",
  Image: "https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg",
  Director: "Chad Stahelski",
  Genres: "Action, Thriller",
  Desc: "An ex-hitman comes out of retirement.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=2AUmvWm5ZDQ",
  imdb: "tt2911666"
},

{
  Name: "Deadpool",
  Year: 2016,
  Duration: "1h 48min",
  Image: "https://image.tmdb.org/t/p/w500/3E53WEZJqP6aM84D8CckXx4pIHw.jpg",
  Director: "Tim Miller",
  Genres: "Action, Comedy",
  Desc: "A wisecracking mercenary gets experimented on.",
  Reviews: reviewSets.mixed,
  trailer: "https://www.youtube.com/watch?v=ONHBaC-pfsk",
  imdb: "tt1431045"
},

{
  Name: "Tenet",
  Year: 2020,
  Duration: "2h 30min",
  Image: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
  Director: "Christopher Nolan",
  Genres: "Sci-Fi, Action",
  Desc: "A secret agent manipulates time.",
  Reviews: reviewSets.mixed,
  trailer: "https://www.youtube.com/watch?v=L3pk_TBkihU",
  imdb: "tt6723592"
},

{
  Name: "Shutter Island",
  Year: 2010,
  Duration: "2h 18min",
  Image: "https://image.tmdb.org/t/p/w500/kve20tXwUZpu4GUX8l6X7Z4jmL6.jpg",
  Director: "Martin Scorsese",
  Genres: "Thriller, Mystery",
  Desc: "A U.S. Marshal investigates a disappearance.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=5iaYLCiq5RM",
  imdb: "tt1130884"
  },
{
  Name: "Gone Girl",
  Year: 2014,
  Duration: "2h 29min",
  Image: "https://upload.wikimedia.org/wikipedia/en/0/05/Gone_Girl_Poster.jpg",
  Director: "David Fincher",
  Genres: "Thriller, Drama",
  Desc: "A man becomes the suspect in his wife's disappearance.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=2-_-1nJf8Vg",
  imdb: "tt2267998"
},

{
  Name: "The Conjuring",
  Year: 2013,
  Duration: "1h 52min",
  Image: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
  Director: "James Wan",
  Genres: "Horror, Mystery",
  Desc: "Paranormal investigators help a haunted family.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=k10ETZ41q5o",
  imdb: "tt1457767"
},

{
  Name: "Insidious",
  Year: 2010,
  Duration: "1h 43min",
  Image: "https://upload.wikimedia.org/wikipedia/en/2/2d/Insidious_poster.jpg",
  Director: "James Wan",
  Genres: "Horror, Thriller",
  Desc: "A family looks to prevent evil spirits.",
  Reviews: reviewSets.mixed,
  trailer: "https://www.youtube.com/watch?v=zuZnRUcoWos",
  imdb: "tt1591095"
},

{
  Name: "Iron Man",
  Year: 2008,
  Duration: "2h 6min",
  Image: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
  Director: "Jon Favreau",
  Genres: "Action, Superhero",
  Desc: "Tony Stark builds a high-tech suit to escape captivity.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=8ugaeA-nMTc",
  imdb: "tt0371746"
},

{
  Name: "Captain America: The First Avenger",
  Year: 2011,
  Duration: "2h 4min",
  Image: "https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
  Director: "Joe Johnston",
  Genres: "Action, Adventure",
  Desc: "Steve Rogers becomes Captain America.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=JerVrbLldXw",
  imdb: "tt0458339"
},

{
  Name: "Doctor Strange",
  Year: 2016,
  Duration: "1h 55min",
  Image: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
  Director: "Scott Derrickson",
  Genres: "Fantasy, Action",
  Desc: "A surgeon learns mystic arts.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=HSzx-zryEgM",
  imdb: "tt1211837"
},

{
  Name: "Thor: Ragnarok",
  Year: 2017,
  Duration: "2h 10min",
  Image: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
  Director: "Taika Waititi",
  Genres: "Action, Comedy",
  Desc: "Thor must stop Ragnarok.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=ue80QwXMRHg",
  imdb: "tt3501632"
},

{
  Name: "Black Panther",
  Year: 2018,
  Duration: "2h 14min",
  Image: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
  Director: "Ryan Coogler",
  Genres: "Action, Superhero",
  Desc: "King T'Challa defends Wakanda.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=xjDjIWPwcPU",
  imdb: "tt1825683"
},

{
  Name: "Toy Story 2",
  Year: 1999,
  Duration: "1h 32min",
  Image: "https://upload.wikimedia.org/wikipedia/en/c/c0/Toy_Story_2.jpg",
  Director: "John Lasseter",
  Genres: "Animation, Family",
  Desc: "Woody is stolen by a collector.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=xNWSGRD5CzU",
  imdb: "tt0120363"
},

{
  Name: "Toy Story 3",
  Year: 2010,
  Duration: "1h 43min",
  Image: "https://upload.wikimedia.org/wikipedia/en/6/69/Toy_Story_3_poster.jpg",
  Director: "Lee Unkrich",
  Genres: "Animation, Family",
  Desc: "Toys face uncertain future.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=JcpWXaA2qeg",
  imdb: "tt0435761"
},
{
  Name: "Up",
  Year: 2009,
  Duration: "1h 36min",
  Image: "https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg",
  Director: "Pete Docter",
  Genres: "Animation, Adventure",
  Desc: "An old man flies his house.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=pkqzFUhGPJg",
  imdb: "tt1049413"
},

{
  Name: "Inside Out",
  Year: 2015,
  Duration: "1h 35min",
  Image: "https://image.tmdb.org/t/p/w500/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
  Director: "Pete Docter",
  Genres: "Animation, Family",
  Desc: "Emotions guide a young girl.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=seMwpP0yeu4",
  imdb: "tt2096673"
},

{
  Name: "The Hangover",
  Year: 2009,
  Duration: "1h 40min",
  Image: "https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg",
  Director: "Todd Phillips",
  Genres: "Comedy",
  Desc: "Friends wake up after wild night.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=tcdUhdOlz9M",
  imdb: "tt1119646"
},

{
  Name: "Superbad",
  Year: 2007,
  Duration: "1h 53min",
  Image: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
  Director: "Greg Mottola",
  Genres: "Comedy",
  Desc: "Teenagers plan a party.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=4eaZ_48ZYog",
  imdb: "tt0829482"
},

{
  Name: "A Quiet Place Part II",
  Year: 2021,
  Duration: "1h 37min",
  Image: "https://image.tmdb.org/t/p/w500/4q2hz2m8hubgvijz8Ez0T2Os2Yv.jpg",
  Director: "John Krasinski",
  Genres: "Horror, Thriller",
  Desc: "Family faces new dangers.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=BpdDN9d9Jio",
  imdb: "tt8332922"
},

{
  Name: "Hereditary",
  Year: 2018,
  Duration: "2h 7min",
  Image: "https://image.tmdb.org/t/p/w500/p9fmuz2Oj3HtEJEqbIwkFGUhVXD.jpg",
  Director: "Ari Aster",
  Genres: "Horror",
  Desc: "Dark family secrets unravel.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=V6wWKNij_1M",
  imdb: "tt7784604"
},

{
  Name: "The Lion King",
  Year: 1994,
  Duration: "1h 28min",
  Image: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg",
  Director: "Roger Allers",
  Genres: "Animation",
  Desc: "A lion cub becomes king.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=4sj1MT05lAA",
  imdb: "tt0110357"
},

{
  Name: "Aladdin",
  Year: 1992,
  Duration: "1h 30min",
  Image: "https://upload.wikimedia.org/wikipedia/en/9/9a/Aladdin_%28Official_2019_Film_Poster%29.png",
  Director: "Ron Clements",
  Genres: "Animation",
  Desc: "A street boy finds a magic lamp.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=foyufD52aog",
  imdb: "tt0103639"
},

{
  Name: "The Notebook",
  Year: 2004,
  Duration: "2h 3min",
  Image: "https://image.tmdb.org/t/p/w500/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg",
  Director: "Nick Cassavetes",
  Genres: "Romance",
  Desc: "A love story across years.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=FC6biTjEyZw",
  imdb: "tt0332280"
},

{
  Name: "Me Before You",
  Year: 2016,
  Duration: "1h 50min",
  Image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Me_Before_You_%28film%29.jpg",
  Director: "Thea Sharrock",
  Genres: "Romance, Drama",
  Desc: "A girl cares for a disabled man.",
  Reviews: reviewSets.mixed,
  trailer: "https://www.youtube.com/watch?v=Eh993__rOxA",
  imdb: "tt2674426"
},
{
  Name: "Edge of Tomorrow",
  Year: 2014,
  Duration: "1h 53min",
  Image: "https://upload.wikimedia.org/wikipedia/en/f/f9/Edge_of_Tomorrow_Poster.jpg",
  Director: "Doug Liman",
  Genres: "Sci-Fi, Action",
  Desc: "A soldier relives the same day.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=vw61gCe2oqI",
  imdb: "tt1631867"
},

{
  Name: "Pacific Rim",
  Year: 2013,
  Duration: "2h 11min",
  Image: "https://upload.wikimedia.org/wikipedia/en/f/f3/Pacific_Rim_FilmPoster.jpeg",
  Director: "Guillermo del Toro",
  Genres: "Sci-Fi, Action",
  Desc: "Humans pilot giant robots.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=5guMumPFBag",
  imdb: "tt1663662"
},

{
  Name: "The Imitation Game",
  Year: 2014,
  Duration: "1h 54min",
  Image: "https://upload.wikimedia.org/wikipedia/en/8/87/The_Imitation_Game_%282014%29.png",
  Director: "Morten Tyldum",
  Genres: "Biography, Drama",
  Desc: "Alan Turing cracks codes.",
  Reviews: reviewSets.excellent,
  trailer: "https://www.youtube.com/watch?v=nuPZUUED5uk",
  imdb: "tt2084970"
},

{
  Name: "The Theory of Everything",
  Year: 2014,
  Duration: "2h 3min",
  Image: "https://upload.wikimedia.org/wikipedia/en/6/67/The_Theory_of_Everything_%282014%29.jpg",
  Director: "James Marsh",
  Genres: "Biography",
  Desc: "Story of Stephen Hawking.",
  Reviews: reviewSets.strong,
  trailer: "https://www.youtube.com/watch?v=Salz7uGp72c",
  imdb: "tt2980516"
}
];

async function seed() {
  await Movie.deleteMany({});
  await Movie.insertMany(dummyMovies);
  console.log("data seeded")
}

module.exports = seed;
