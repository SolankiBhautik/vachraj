
import { Button } from './contentElements/uiElements/Button';
import { Card, CardContent } from './ui/Card';


const ProductItem = ({ product, layout = 'default' }) => {
    const productImageUrl = product.images && product.images.length > 0
        ? `https://vachraj.vercel.app${product.images[0].url}`
        : 'https://placehold.jp/333333/ffffff/150x100.png';

    return (
        <Card className=" hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-0">
                <img
                    src={productImageUrl}
                    alt={product.name || "Product Image"}
                    className="w-full h-auto object-cover"
                />
            </CardContent>

            <CardContent className="p-4 grid">
                <div className="text-2xl font-bold pb-2">${product.price}</div>
                <div className="tracking-tight text-base font-normal pb-1">
                    {product.name}
                </div>

                {layout === 'featured' && (
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
