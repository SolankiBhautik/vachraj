
import { fetchData } from '../../lib/fetchData';
import ProductItem from "../../components/ProductItem"

export default async function ProductList() {
    const products = await fetchData(`/frame/product/`);

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
