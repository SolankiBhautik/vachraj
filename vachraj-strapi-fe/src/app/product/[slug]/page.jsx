import axios from 'axios';

export const revalidate = 0;

const ProductPage = async ({ params }) => {
    const { slug } = params;

    let product = null;
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/frame/product/find/${slug}`);
        product = response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return { notFound: true }; // Return 404 if the product is not found
    }

    return (
        <div className="product-detail ">
            {/* Product Image */}
            <div className="product-image mb-6">
                <img
                    src={
                        (product.images && product.images.length > 0 && product.images[0]?.url)
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
                            : 'https://placehold.jp/333333/ffffff/150x100.png'
                    }
                    alt={product.name}
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Product Name and Price */}
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-green-600 font-semibold mb-4">${product.price}</p>

            {/* Product Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Product Categories */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Category:</h3>
                <ul className="list-disc list-inside">
                    {product.category.map((cat) => (
                        <li key={cat.id} className="text-gray-600">
                            {cat.name} - {cat.description}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Product Sizes */}
            {product.sizes.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Available Sizes:</h3>
                    <ul className="list-disc list-inside">
                        {product.sizes.map((size) => (
                            <li key={size.id} className="text-gray-600">
                                {size.name} (Dimensions: {size.dimensions})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Featured Badge */}
            {product.featured && (
                <div className="mb-6">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded">Featured Product</span>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
