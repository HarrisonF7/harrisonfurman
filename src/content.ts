/** Personal website copy. Empty optional fields stay hidden. */
export interface SiteContent {
  name: string; introduction: string; bio: string; portrait: string; details: { label: string; value: string }[];
  hobbies: { title: string; category: string; description: string; icon: string }[];
  knicks: { connection: string; memory: string; love: string };
  links: { label: string; href: string }[];
}
export const content: SiteContent = {
  name: 'Harrison Furman',
  introduction: 'I’m Harrison, a huge sports fan with a special love for basketball and the New York Knicks. I love following the NBA and sharing my passion for the game.',
  bio: 'Originally from New Jersey, I’m currently in the AI in Biomedical and Health Sciences (AIBHS) program at the University of Florida. I’m interested in exploring how artificial intelligence can improve healthcare and patient outcomes.',
  portrait: '',
  details: [{ label: 'My team', value: 'New York Knicks' }, { label: 'My game', value: 'Basketball' }, { label: 'Off the court', value: 'New Jersey roots · Studying at UF' }],
  hobbies: [
    { title: 'The game I love.', category: '01 / BASKETBALL', description: 'I love watching NBA games, following my favorite players, and keeping up with the Knicks throughout the season.', icon: 'ball' },
    { title: 'My team. My game.', category: '02 / NBA 2K', description: 'In NBA 2K, I enjoy building my own teams, playing with my favorite NBA players, and competing for fun.', icon: 'spark' },
    { title: 'Time to unwind.', category: '03 / MOVIES & DOWNTIME', description: 'In my free time, I enjoy relaxing with a good movie. I watch a variety of films, especially action, comedy, and thrillers.', icon: 'compass' },
  ],
  knicks: { connection: 'I was born and raised a Knicks fan. Supporting the team has been part of my life from the very beginning, and I’ve been cheering them on my entire life.', memory: 'One of my favorite Knicks memories is going to a game with my mom and sitting courtside. It was an unforgettable experience to share with her.', love: 'The Knicks keep me connected to my New Jersey roots. Even after living in Florida for all these years, supporting the team makes me feel closer to home.' },
  links: [],
};
