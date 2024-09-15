import React from 'react';
import { Button as UiButton } from '../uiElements/Button';
import HeadingUi from '../../animations/HeadingUi';


const Hero = ({ Heading, Text, Image, Button }) => {
  const imgdata = Image.data[0].attributes;

  return (
    <section className="hero-section py-16">
      <div className="">
        <div className="text-content flex flex-col center md:text-left  mb-8 lg:mb-0 ">
          <HeadingUi heading={Heading} text={Text} />
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
