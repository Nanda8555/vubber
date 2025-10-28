import React from 'react'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './carouselLoopArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import '@/index.css'
import { CarouselContentByIndex,CarouselTitleByIndex,CarouselFeatureByIndex, CarouselImageByIndex } from "@/components/landing/LandingCarouselContent"
type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}
import ClassNames from 'embla-carousel-class-names'

const CarouselLoop: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options,[ClassNames()])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla sm:--slide-size-50%">
     
      <div className="embla__viewport " ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
                <div className="embla__slide" key={index}>              
                    <div className='bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl h-full p-8 sm:p-10 md:p-10'>
                        <h3 className='text-xl font-semibold text-vubber-text-primary mb-2'>
                          {CarouselFeatureByIndex(index)}
                        </h3>
                        <img src={CarouselImageByIndex(index)} className='rounded-xl pb-2 w-auto object-center aspect-[16/9] object-cover '>
                        {/* placeholder images, change it at landingcarouselcontent */}
                        </img>
                        <h3 className='text-2xl font-semibold text-vubber-text-primary mb-2'>
                          {CarouselTitleByIndex(index)} 
                        </h3>
                        <p className='text-vubber-text-secondary'>
                          {CarouselContentByIndex(index)} 
                        </p>
                        
                    </div>
            </div>
          ))}
        </div>
      </div>
{/* add fade, move buttons to the sides, increase title font */}
      <div className='grid grid-cols-2 sm:-translate-y-64'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton  onClick={onNextButtonClick} disabled={nextBtnDisabled} /> 
      </div>
    
    </section>
  )
}

export default CarouselLoop

