import React from 'react'

const images = [
    "/previmages/gallery4.jpg",
    "/previmages/gallery2.jpeg",
    "/previmages/gallery3.jpeg",
    "/previmages/gallery5.jpg",
    "/previmages/gallery1.jpeg",
    "/previmages/gallery6.jpeg"
]
  
const TopImage = ({ image }) => {
    return (
      <div className="flex justify-center items-center md:items-start h-full">
        <img src={image} alt="Top" className="max-h-96 w-auto" />
      </div>
    )
}
  
const BottomImage = ({ image }) => {
    return (
      <div className="flex justify-center mt-0 items-center md:items-end h-full">
        <img src={image} alt="Bottom" className="max-h-96 w-auto" />
      </div>
    )
}

const Images = () => {
  return (
    <>
        {images.map((image, index) => (
        <div className="mr-20 panel3 md:w-[50vw] w-[100vw] h-[100vh] " key={index}>
          {index % 2 === 0 ? (
            <BottomImage image={image} />
          ) : (
            <TopImage image={image} />
          )}
        </div>
        ))}
    </>
  )
}

export default Images