"use client"

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button as UiButton } from '../../contentElements/uiElements/Button';
import { Card, CardContent } from '../../ui/Card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../ui/carousel';

const FeatureProduct = ({ Heading, Description, Button, frame_products }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const handlePrevious = () => {
        setActiveIndex((prev) => (prev === 0 ? frame_products.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === frame_products.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-16 bg-white feature">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold mb-4">{Heading}</h2>
                        <p className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: Description }}></p>
                        {Button && (
                            <UiButton
                                label={Button.Lable}
                                link={Button.Link}
                                isExternal={Button.isExternalLink}
                                fullyRounded={Button.FullyRounded}
                            />
                        )}
                    </div>
                    <div className="">
                        <Carousel className="relative overflow-hidden">
                            <CarouselContent className="flex space-x-4">
                                {frame_products.map((product, index) => {
                                    const distance = Math.abs(index - activeIndex);
                                    let itemClass = "opacity-50 transition-all duration-300 ease-in-out";
                                    let scale = "scale-75";
                                    if (distance === 0) {
                                        itemClass = "opacity-100";
                                        scale = "scale-100";
                                    } else if (distance === 1) {
                                        itemClass = "opacity-75";
                                        scale = "scale-90";
                                    } else if (distance === 2) {
                                        itemClass = "opacity-50";
                                        scale = "scale-75";
                                    }

                                    return (
                                        <CarouselItem key={product.id} className={`flex-none ${itemClass} ${scale}`}>
                                            <Card className="w-full">
                                                <CardContent className="p-0">
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image}`}
                                                        alt={product.name}
                                                        className="w-full h-auto object-cover"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    );
                                })}
                            </CarouselContent>
                            <CarouselPrevious onClick={handlePrevious} className="absolute top-1/2 left-4 transform -translate-y-1/2">
                                <ChevronLeft />
                            </CarouselPrevious>
                            <CarouselNext onClick={handleNext} className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                <ChevronRight />
                            </CarouselNext>
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureProduct;
