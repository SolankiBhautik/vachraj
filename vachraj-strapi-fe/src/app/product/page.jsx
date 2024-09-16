
import axios from 'axios';
import ProductItem from "../../components/ProductItem"

export default async function ProductList() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/frame/product/`);
    const products = response.data;

    return (
        <section className="product-list">
            <h1 className="text-3xl font-bold mb-6">Product List</h1>
            <div className="grid grid-cols-3 gap-2">
                {products.map((product) => (
                    <ProductItem product={product} key={product.id} />
                ))}
            </div>
        </section>
    );
}
