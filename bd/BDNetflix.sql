SELECT * FROM netflix.actors_has_movies;

alter table actors_has_movies add foreign key(movies_idmovies) references movies (idMovies);
alter table actors_has_movies add foreign key(actors_idActors) references actors (idActors);
alter table rel_movies_users add foreign key(movies_idmovies) references movies (idMovies);
alter table rel_movies_users add foreign key(Users_idUsers) references Users (idUsers);