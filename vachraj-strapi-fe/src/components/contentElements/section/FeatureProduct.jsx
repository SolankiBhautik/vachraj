"use client";

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button as UiButton } from '../../contentElements/uiElements/Button';
import { Card, CardContent } from '../../ui/Card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../ui/carousel';

const FeatureProduct = ({ Heading, description, Button, products }) => {
    const [isMounted, setIsMounted] = useState(false);

    return (
        <section className="py-16  feature">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold mb-4">{Heading}</h2>
                        <p className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: description }}></p>
                        {Button && (
                            <UiButton
                                label={Button.Lable}
                                link={Button.Link}
                                isExternal={Button.isExternalLink}
                                fullyRounded={Button.FullyRounded}
                            />
                        )}
                    </div>
                    <Carousel className="w-full max-w-xs mx-auto">
                        <CarouselContent>
                            {products.map((product) => (
                                <CarouselItem key={product.id}>
                                    <Card>
                                        <CardContent className="p-0">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image.url}`}
                                                alt={product.name || 'Product Image'}
                                                className="w-full h-auto object-cover"
                                            />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default FeatureProduct;
