import React from 'react';
const DynamicImage = ({ image }) => {
  if (!image || !image.data || !image.data.length) {
    return null; // Return null if no image data is provided
  }

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const imageData = image.data[0].attributes;
  const {
    alternativeText,
    caption,
    formats,
    url,
    width,
    height,
  } = imageData;

  // Determine the appropriate image source based on the screen size
  const getSrcSet = () => {
    const srcSet = [];
    if (formats.thumbnail) {
      srcSet.push(`${BACKEND_URL}${formats.thumbnail.url} 245w`);
    }
    if (formats.small) {
      srcSet.push(`${BACKEND_URL}${formats.small.url} 500w`);
    }
    if (formats.medium) {
      srcSet.push(`${BACKEND_URL}${formats.medium.url} 750w`);
    }
    if (formats.large) {
      srcSet.push(`${BACKEND_URL}${formats.large.url} 1000w`);
    }
    return srcSet.join(', ');
  };


  // Fallback to the original image if no specific formats are available
  const src = formats.large ? formats.large.url : url;

  let imgsrc = `${BACKEND_URL}${src}`;
  return (
    <figure className="image-container">
      <img
        src={imgsrc}
        srcSet={getSrcSet()}
        sizes="(max-width: 500px) 245px, (max-width: 750px) 500px, (max-width: 1000px) 750px, 1000px"
        alt={alternativeText || 'Image'}
        width={width}
        height={height}
        className="dynamic-image"
      />
      {caption && <figcaption className="image-caption">{caption}</figcaption>}
    </figure>
  );
};

export default DynamicImage;
