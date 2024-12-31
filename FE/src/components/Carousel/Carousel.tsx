import { SetStateAction, useEffect, useRef, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'
import 'animate.css'

function Carousel() {
  const slides = [
    { url: 'https://cdn.galaxycine.vn/media/2024/11/19/trieu-hoi-linh-mieu--ngan-deal-vi-dieu-4_1731987939982.jpg' },
    { url: 'https://cdn.galaxycine.vn/media/2024/11/14/linh-mieu-1_1731569919178.jpg' },
    { url: 'https://cdn.galaxycine.vn/media/2024/12/11/sonic-3-2048_1733890044073.jpg' },
    { url: 'https://cdn.galaxycine.vn/media/2024/11/12/cuoi-xuyen-bien-gioi-2048_1731395977602.jpg' },
    { url: 'https://cdn.galaxycine.vn/media/2024/12/19/kvh-2048_1734593009930.jpg' }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setTimeout(() => {
        nextSlide()
      }, 3000)
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [autoPlay, currentIndex])

  const goToSlide = (slideIndex: SetStateAction<number>) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div
      className='max-w-[1600px]  lg:h-[35rem] w-full m-auto md:py-2 md:px-4 relative group flex-col text-center overflow-hidden'
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})`, objectFit: 'contain' }}
        className='w-full h-[50%] lg:h-full rounded-2xl bg-cover duration-500 animate__animated animate__fadeIn text-center'
      ></div> */}
      <img
        src={slides[currentIndex].url}
        alt=''
        className='w-full h-[200px] mt-2 md:h-full md:rounded-2xl bg-cover duration-500 animate__animated animate__fadeIn text-center object-center'
      />
      <div className='hidden group-hover:block absolute top-[50%] left-3 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className='hidden group-hover:block absolute top-[50%] right-3 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2 lg:py-4'>
        {slides.map((_slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className='text-2xl cursor-pointer'>
            <RxDotFilled
              className={currentIndex === slideIndex ? 'animate__animated animate__pulse text-orange-600' : ''}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
