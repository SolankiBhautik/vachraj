"use client";

import React, { useEffect, useState } from "react";
import { Button as UiButton } from "../../contentElements/uiElements/Button";
import ProductItem from '../../ProductItem';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel";


const FeatureProduct = ({ Heading, description, Button, products }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <section id='featured' className="pb-16 feature">
            <div className="container mx-auto ">
                <div className="mb-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold mb-4">{Heading}</h2>
                        <p
                            className="text-gray-700 mb-6"
                            dangerouslySetInnerHTML={{ __html: description }}
                        ></p>
                        {Button && (
                            <UiButton
                                label={Button.Lable}
                                link={Button.Link}
                                isExternal={Button.isExternalLink}
                                fullyRounded={Button.FullyRounded}
                            />
                        )}
                    </div>
                    <Carousel className="">
                        <CarouselContent>
                            {products.map((product) => (
                                <CarouselItem key={product.id} className=" md:basis-1/2 lg:basis-1/3">
                                    <ProductItem product={product} layout="featured" />
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
