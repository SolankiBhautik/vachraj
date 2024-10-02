
import { Button } from './contentElements/uiElements/Button';
import { Card, CardContent } from './ui/Card';
import Image from 'next/image';



const ProductItem = ({ product, layout = 'default' }) => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';


    return (
        <Card className=" hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-0">
                <Image
                    className="w-full h-auto object-cover"
                    src={`${baseUrl}${product.images[0].formats.small.url}`}
                    alt={product.images[0].alternativeText || product.images[0].name}
                    width={product.images[0].formats.small.width}
                    height={product.images[0].formats.small.height}
                />
            </CardContent>

            <CardContent className="p-4 grid">
                <div className="text-2xl font-bold pb-2">${product.price}</div>
                <div className="tracking-tight text-base font-normal pb-1">
                    {product.name}
                </div>

                {layout === 'default' && (
                    <p className="text-xs text-muted-foreground">
                        {product.description.length > 100
                            ? `${product.description.substring(0, 100)}...`
                            : product.description}
                    </p>
                )}

                <Button
                    label="View Details"
                    link={`/product/${product.id}`}
                    className='mt-2'
                />
            </CardContent>
        </Card>
    );
};


export default ProductItem;
