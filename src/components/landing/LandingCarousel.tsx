import React from 'react'
import CarouselLoop from '../ui/CarouselLoop/carouselLoop'
import { EmblaOptionsType } from 'embla-carousel'
import '@/index.css'

const OPTIONS: EmblaOptionsType = {  loop: true }
const SLIDE_COUNT = 4
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
// Array.from(Array(SLIDE_COUNT).keys())


const LandingCarousel: React.FC = () => (
  <>

    <CarouselLoop  slides={SLIDES} options={OPTIONS} />
    
  </>
)

export default LandingCarousel
