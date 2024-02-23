import { useEffect, useState } from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

export const ImageSlider = ({ url, limit }) => {
    const [image, setImage] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchImages = async (getUrl) => {
      try {
        setLoading(true);
        const response = await fetch(`${getUrl}?page=1&limit=${limit}`);
        const data = await response.json();
        if (data) {
          setImage(data);
          setLoading(false);
        }
      } catch (error) {
        setErrorMsg(error.message)
        setLoading(false);
      }
    };
    
    const handlePrevious = () => {
      setCurrentSlide(currentSlide === 0 ? image.length - 1 : currentSlide - 1)
    }

    const handleNext = () => {
      setCurrentSlide(currentSlide === image.length - 1 ? 0 : currentSlide + 1)
    }
  
    useEffect(() => {
      if (url !== '') {
        fetchImages(url)
      }
    }, [url])
  
    if (loading) {
      return <div className='loading'>
        <h2>Loading...</h2>
      </div>
    }
  
    if (errorMsg !== null) {
      return <div>An error has ocurred. Please wait <br/> {errorMsg}</div>
    }

    return (
      <>
        <div className='container'>
            <div className="title">
              <h1>Some slides about remote working</h1>
            </div>
            <div className='sliderWrapper'>
                <BsArrowLeftCircle onClick={handlePrevious} className='arrow leftArrow'/>
                {
                    image && image.length ?
                    image.map((images, index) => (
                        <img
                          key={images.id}
                          src={images.download_url}
                          alt={images.author}
                          className={currentSlide === index ? 'currentImage' : 'hideCurrentImage'}
                        />
                    ))
                    : null
                }
                <BsArrowRightCircle onClick={handleNext} className="arrow rightArrow" />
                <span className='imagesIndicator'>
                    {
                        image && image.length ?
                        image.map((_, index) => (
                            <button
                              key={index}
                              className={currentSlide === index ? 'currentIndicator' : 'currentIndicator inactiveIndicator'}
                              onClick={() => setCurrentSlide(index)}
                            ></button>
                        ))
                        : null
                    }
                </span>
            </div>
        </div>
      </>
    )
}
