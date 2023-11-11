'use client'
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation"

type Product = {
    id: number,
    title: string,
    price: number
}

export default function  UpdateProduct(product: Product) {
    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault()

        setIsMutating(true)

        await fetch(`https://sparkling-erin-gosling.cyclic.app/products/${product.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:  JSON.stringify({
                title: title,
                price: price
            })
        })

        setIsMutating(false)

        router.refresh()
        setModal(false)
    }

    function handleChange() {
        setModal(!modal)
    }

    return(
        <div>
            <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>

            <div className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Edit {product.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label htmlFor="" className="font-bold label">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="Product name.."/>
                        </div>

                        <div className="form-control">
                            <label htmlFor="" className="font-bold label">Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input w-full input-bordered" placeholder="Product price.."/>
                        </div>

                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>Close</button>
                            { !isMutating ? 
                            ( <button type="submit" className="btn btn-primary">Update</button> ) : 
                            ( <button type="submit" className="btn btn-loading">Updating...</button> ) 
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}