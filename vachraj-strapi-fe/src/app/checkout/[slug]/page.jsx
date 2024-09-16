'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/Label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/Card";

const CheckoutPage = ({ params }) => {
    const { slug } = params;

    const [product, setProduct] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customization, setCustomization] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/frame/product/find/${slug}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                // Handle not found product case, you might want to return an error page or 404 component
            }
        };

        fetchProduct();
    }, [slug]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await axios.post('/api/checkout', { ...data, productId: product.id, customization });
            // Handle successful checkout (e.g., show success message, redirect)
        } catch (error) {
            console.error('Checkout error:', error);
            // Handle error (e.g., show error message)
        }
        setIsSubmitting(false);
    };

    if (!product) {
        return <div>Loading...</div>; // Or a more sophisticated loading state
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Product Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-square relative mb-4">
                            <Image
                                src={product.images && product.images.length > 0
                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
                                    : 'https://placehold.jp/333333/ffffff/400x400.png'}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter>
                        <Label htmlFor="customization">Customization</Label>
                        <Input
                            id="customization"
                            value={customization}
                            onChange={(e) => setCustomization(e.target.value)}
                            placeholder="Enter any custom requests"
                        />
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Checkout Details</CardTitle>
                        <CardDescription>Please fill in your shipping and payment information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" {...register('name', { required: 'Name is required' })} />
                                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...register('email', { required: 'Email is required' })} />
                                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" {...register('address', { required: 'Address is required' })} />
                                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" {...register('city', { required: 'City is required' })} />
                                    {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                    <Input id="zipCode" {...register('zipCode', { required: 'ZIP Code is required' })} />
                                    {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input id="cardNumber" {...register('cardNumber', { required: 'Card Number is required' })} />
                                {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber.message}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expirationDate">Expiration Date</Label>
                                    <Input id="expirationDate" {...register('expirationDate', { required: 'Expiration Date is required' })} />
                                    {errors.expirationDate && <p className="text-sm text-red-500">{errors.expirationDate.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" {...register('cvc', { required: 'CVC is required' })} />
                                    {errors.cvc && <p className="text-sm text-red-500">{errors.cvc.message}</p>}
                                </div>
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing
                                    </>
                                ) : (
                                    'Complete Purchase'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
};

export default CheckoutPage;
