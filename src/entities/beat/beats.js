// Define the array as a constant. Do NOT export it on this line.
const beats = [
  {
    id: 'beat1',
    name: 'Midnight Pulse', // Using 'name' to match the last working version
    artist: 'Neofantasia',
    genre: 'Trap',
    bpm: 140,
    price: 29.99,
    audioSrc: '/sfx/title-theme.wav',
    artwork: '/artwork/artw1.png', // Ensure you have artwork images
  },
  {
    id: 'beat2',
    name: 'Dreamscape Echoes',
    artist: 'Neofantasia',
    genre: 'Lo-Fi',
    bpm: 80,
    price: 29.99,
    audioSrc: '/sfx/title-theme.wav',
    artwork: '/artwork/artw1.png',
  },
  {
    id: 'beat3',
    name: 'Energetic Flow',
    artist: 'Neofantasia',
    genre: 'Pop',
    bpm: 128,
    price: 29.99,
    audioSrc: '/sfx/energetic_flow.mp3',
    artwork: '/artwork/artw1.png',
  },
  // Add your other beats here...
];

// **THE FIX IS HERE:** Use "export default" at the end of the file.
export default beats;