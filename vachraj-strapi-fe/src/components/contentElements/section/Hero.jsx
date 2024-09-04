import React from 'react';
import Button from '../uiElements/Button';
import { marked } from 'marked';


const Hero = ({ heading, description, image, link }) => {

  const descriptionHtml = marked(description);

  const imgdata = image.data[0];
  return (
    <section className="hero-section py-16">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between md:ps-[10%]">
      <div className="text-content px-4 text-white text-center md:text-left sm:w-[75%] md:w-1/2 mb-8 lg:mb-0 ">
        <h1 className="gradient-heading !leading-tight  text-5xl lg:text-6xl font-bold mb-4 tracking-[-2px]">{heading}</h1>
        <div 
          className="text-lg mb-6 " 
          dangerouslySetInnerHTML={{ __html: descriptionHtml }} 
        />
          {link && (
            <Button
              label={link.Lable}
              link={link.Link}
              isExternal={link.isExternalLink}
              fullyRounded={link.FullyRounded}
            />
          )}
      </div>
      <div className="image-content lg:w-1/2">
        <div >
          {imgdata && (
            <img 
               src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${imgdata.attributes.url}`}  
               alt={imgdata.attributes.alternativeText || 'Image'}
               width={imgdata.attributes.width}
               height={imgdata.attributes.height}
               className='absolute inset-0 -z-10 h-screen 2xl:h-fit 2xl:w-screen object-cover object-center '
            />
          )}
        </div>
      </div>
    </div>
  </section>
);
};

export default Hero;
