import { Carousel } from 'react-bootstrap'

export default function Banner() {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="images/toalanha.png"
            alt="First slide"
            style={{ height: '500px' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="images/tau1.png"
            alt="Third slide"
            style={{ height: '500px' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="images/DuLichBangTauHoa.png"
            alt="Third slide"
            style={{ height: '500px' }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
