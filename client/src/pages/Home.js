import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

function Home() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  return (
    <>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="First slide"
        />
        <Carousel.Caption className="">
          <h3 className="text-xl">Let us give your pet a good time to let you have a good time</h3>
          <p>Trust Pet Nanny!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/3791641/pexels-photo-3791641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className='text-secondary text-lg'>Your pets are worth it.</h3>
          <p className='text-secondary'>Trust Pet Nanny!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1753079/pexels-photo-1753079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>The pets’ daycare.</h3>
          <p>
          Trust Pet Nanny!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

<h2 className="m-5 text-center text-secondary">Get your journey with your pets <span className="text-primary">(or in this case without your pets)</span> started here</h2>
<div className="d-flex justify-content-center">
<Button href="/NannyList" variant="primary" className="m-2 mb-5 p-3">Search for a Nanny</Button>{' '}
</div>


</>
  );
}

export default Home;

