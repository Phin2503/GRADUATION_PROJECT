import React from 'react'
import Slider from 'react-slick'
import banner1 from '../../assets/Banner/banner1.jpg'
import banner2 from '../../assets/Banner/banner2.jpg'
import banner3 from '../../assets/Banner/banner3.jpg'
import banner4 from '../../assets/Banner/banner4.jpg'
import banner5 from '../../assets/Banner/banner5.jpg'

const images = [banner1, banner2, banner3, banner4, banner5]

const PrevArrow = (props: any) => {
  const { onClick } = props
  return (
    <button className='slick-prev bg-white rounded-full p-2 mx-2' onClick={onClick} aria-label='Previous'>
      Prev
    </button>
  )
}

const NextArrow = (props: any) => {
  const { onClick } = props
  return (
    <button className='slick-next bg-white rounded-full p-2 mx-2' onClick={onClick} aria-label='Next'>
      Next
    </button>
  )
}

const Carousel: React.FC = () => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }

  return (
    <div className='flex justify-center w-full py-1 overflow-hidden'>
      <div className='w-[80%] md:w-[60%] lg:w-[100%] my-2'>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Banner ${index + 1}`} className='w-full h-auto object-cover rounded-lg' />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Carousel
