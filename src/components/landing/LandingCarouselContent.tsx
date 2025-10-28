import lipsync from '@/assets/carousel/lipsync.jpg';
import easyui from '@/assets/carousel/interface.png';
import voiceclone from '@/assets/carousel/voicematch.jpg';
import fastprocess from '@/assets/carousel/fastprocess.jpg';
// import the images

const feature = [
  "Fast Processing",
  "Intuitive Interface",
  "Natural Voice Cloning",
  "Intelligent Lip-Syncing"
];

// placeholder images
const image = [
  fastprocess,
  easyui,
  voiceclone,
  lipsync,
];

const title = [
  "Rapid Results",
  "Easy to Use",
  "Naturally Good",
  "Complete Immersion"
];

const text = [
  "Vubber accelerates production without compromising quality, delivering voiceovers far quicker than traditional services.",
  "No steep learning curves, no installs. Just upload your video, choose your target languages, and let us do the rest.",
  "Vubber recreates every aspect of your voice, delivering dubbing that sounds genuinely human.",
  "Machine Learning aided mouth movement editing ensures flawless alignment with translated speech."
];

const CarouselFeatureByIndex = index => feature[index % feature.length];
const CarouselImageByIndex = index => image[index % image.length];
const CarouselTitleByIndex = index => title[index % title.length];
const CarouselContentByIndex = index => text[index % text.length];

export {
  CarouselFeatureByIndex,
  CarouselImageByIndex,
  CarouselContentByIndex,
  CarouselTitleByIndex
}