'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../../components/ui/carousel'
import { fetchData } from '../../../lib/fetchData';
import StrapiImage from '../../../components/StrapiImage';

export default function ProductPage({ params }) {
    const { slug } = params
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetchData(`/frame/product/find/${slug}`)
                setProduct(response)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching product:', error)
                setError('Error fetching product.')
                setLoading(false)
            }
        }

        fetchProduct()
    }, [slug])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    if (!product) return <div>Product not found</div>


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="grid md:grid-cols-2 gap-8">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-xs mx-auto md:max-w-md"
                    thumbnails={product.images}
                >
                    <CarouselContent>
                        {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="aspect-square relative">
                                        <StrapiImage image={image} className="rounded-lg" />
                                    </div>
                                </CarouselItem>
                            ))
                        ) : (
                            <CarouselItem>
                                <div className="aspect-square relative">
                                    <Image
                                        src="https://placehold.jp/333333/ffffff/400x400.png"
                                        alt={product.name}
                                        layout="fill"
                                        objectFit="contain"
                                        className="rounded-lg"
                                    />
                                </div>
                            </CarouselItem>
                        )}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                <div className="space-y-6">
                    <div>
                        {product.name && (
                            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        )}
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">(4.0)</span>
                        </div>
                        {product.price && (
                            <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
                        )}
                    </div>

                    {product.description && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{product.description}</p>
                            </CardContent>
                        </Card>
                    )}

                    {product.sizes.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Available Sizes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <Badge key={size.id} variant="secondary" className='text-muted-foreground'>
                                            {size.name}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {product.category.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {product.category.map((cat) => (
                                        <Badge key={cat.id} variant="secondary" className='text-muted-foreground'>
                                            {cat.name}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {product.featured && (
                        <Badge variant="default" className="mb-4">
                            Featured Product
                        </Badge>
                    )}

                    <Button className="w-full" size="lg" asChild>
                        <a href={`/checkout/${product.id}`}>Buy Now</a>
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}