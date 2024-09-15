"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button as UiButton } from "../../contentElements/uiElements/Button";
import { Card, CardContent } from "../../ui/Card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel";

const FeatureProduct = ({ Heading, description, Button, products }) => {
    const [isMounted, setIsMounted] = useState(false);

    // This will ensure the component only renders client-side.
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        // Return nothing or a fallback if the component hasn't mounted yet to prevent hydration issues.
        return null;
    }

    return (
        <section className="py-16 feature">
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
                                    <Link href={`/product/${product.id}`}>
                                        <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                            <CardContent className="p-0 ">
                                                <img
                                                    src={
                                                        (product.images && product.images.length > 0 && product.images[0]?.url)
                                                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
                                                            : 'https://placehold.jp/333333/ffffff/150x100.png'
                                                    }
                                                    alt={product.name || "Product Image"}
                                                    className="w-full h-auto object-cover "
                                                />
                                            </CardContent>
                                            <CardContent className="p-4 grid">
                                                <div className="text-2xl font-bold pb-2">${product.price}</div>
                                                <div className="tracking-tight text-base font-normal pb-1">
                                                    {product.name}
                                                </div>
                                                <p className="text-xs text-muted-foreground pb-2">
                                                    {product.description.length > 100
                                                        ? `${product.description.substring(0, 100)}...`
                                                        : product.description}
                                                </p>
                                                <UiButton
                                                    label="View Details"
                                                    link={`/product/${product.id}`}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Link>
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
