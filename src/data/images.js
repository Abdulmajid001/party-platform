// All images are placeholders. Replace these URLs with your own images
// (put files in /public and use "/your-image.jpg").

export const photo = (seed, width = 900, height = 600) =>
  `https://picsum.photos/seed/${seed}/${width}/${height}`;

export const avatar = (n) => `https://i.pravatar.cc/200?img=${n}`;

export const IMAGES = {
  heroTall: photo("rallyhall-crowd", 800, 1100),
  heroTop: photo("rallyhall-meeting", 700, 500),
  heroBottom: photo("rallyhall-community", 700, 500),
  announce: photo("rallyhall-announce", 900, 700),
  signIn: photo("rallyhall-signin", 1000, 1200),
  register: photo("rallyhall-register", 1000, 1400),
  cover: photo("rallyhall-cover", 1400, 420),
};
