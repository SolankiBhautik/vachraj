import React from 'react';
import { Button as UiButton } from '../uiElements/Button';


const Hero = ({ Heading, Description, Image, Button }) => {
  const imgdata = Image[0];
  return (
    <section className="hero-section py-16 feature">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-content text-white text-center md:text-left sm:w-[75%] md:w-1/2 xl:w-full mb-8 lg:mb-0 ">
          <h1 className="gradient-heading !leading-tight  text-5xl lg:text-6xl font-bold mb-4 tracking-[-2px]">{Heading}</h1>
          <div
            className="text-lg mb-6 "
            dangerouslySetInnerHTML={{ __html: Description }}
          />
          {Button && (
            <UiButton
              label={Button.Lable}
              link={Button.Link}
              isExternal={Button.isExternalLink}
              fullyRounded={Button.FullyRounded}
            />
          )}
        </div>
        <div className="image-content lg:w-1/2">
          <div >
            {imgdata && (
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${imgdata.url}`}
                alt={imgdata.alternativeText || 'Image'}
                width={imgdata.width}
                height={imgdata.height}
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
