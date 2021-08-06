import Actor from './Actor.js';
import Film from './Film.js';
import Review from './Review.js';
import Reviewer from './Reviewer.js';
import Studio from './Studio.js';

Film.belongsToMany(Actor, { through: 'ActorFilm' });
Actor.belongsToMany(Film, { through: 'ActorFilm' });

Studio.hasMany(Film);
Film.belongsTo(Studio);

Film.hasMany(Review);
Review.belongsTo(Film);

Reviewer.hasMany(Review);
Review.belongsTo(Reviewer);
