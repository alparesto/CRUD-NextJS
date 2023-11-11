import AddProduct from "./addProduct";
import UpdateProduct from "./updateProduct";
import DeleteProduct from "./deleteProduct";

export const metadata = {
    title: "Product List"
}

type Product = {
    id: number,
    title: string,
    price: number
}

async function getProducts() {
    const res = await fetch('https://sparkling-erin-gosling.cyclic.app/products', {cache: 'no-store'});
    return res.json();
}

export default async function ProductList() {
    const products: Product[] = await getProducts()
    return (
        <div className="py-10 px-10">
            <div className="py-2">
                <AddProduct />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    { products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td className="flex">
                                <div className="mr-1">
                                    <UpdateProduct { ...product } />
                                </div>

                                <div className="mr-1">
                                    <DeleteProduct { ...product } />
                                </div>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}