import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import AddProduct from './AddProduct';
import HTTP from './axiosConfig';
import EditProduct from './EditProduct'

function Products() {
    const [products, setproducts] = useState([])
    const [showAddModal, setshowAddModal] = useState(false)
    const [showEditModal, setshowEditModal] = useState(false)
    const [selectedProduct, setselectedProduct] = useState({})

    // console.log("selectedProduct",selectedProduct);
    // console.log("Products",products);

    useEffect(() => {
        fetchProducts()
    }, [])

    let fetchProducts = async () => {
        let response = await HTTP.get("/api/products")
        console.log("response Products", response);
        setproducts(response.data.products)
    }

    //to open add Modal
    let openAddModal = () => {
        setshowAddModal(true)
    }

    let hideAddModal = () => {
        setshowAddModal(false)
    }
    // get selected product and open edit modal
    let getSelectedProduct = (product) => {
        setselectedProduct(product)
        console.log(product);
        setshowEditModal(true)
    }

    let hideEditModel = () => {
        setshowEditModal(false)
    }

    //to delete the product
    let deleteProduct = async (prodID) => {
        try {
            // console.log("prodID",prodID);
            let response = await HTTP.delete(`/api/products/${prodID}`)
            if (response.data.error) {
                alert(response.data.message)
            } else {
                alert(response.data.message)
                fetchProducts()
            }
        } catch (err) {
            alert(err.message)
        }
    }
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product Description</th>
                        <th>Product Image</th>
                        <th>
                            <Button className='btn btn-warning' onClick={openAddModal}>➕ADD</Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>
                    {
                        return <tr key={product._id} >
                        <td>{product._id}</td>
                        <td>{product.productName}</td>
                        <td>{product.productPrice}</td>
                        <td>{product.productDescription}</td>
                        <td>
                            <img 
                            width="220px"
                            height="200px"
                            src={product.productImageURL}
                            alt={product.productName} 
                            />
                        </td>
                        <td>
                            <Button onClick={()=>
                            {
                                getSelectedProduct(product) 
                            }}>Edit</Button>
                            <Button onClick={()=>
                            {
                                deleteProduct(product._id)
                            }} >
                                Delete
                            </Button>
                        </td>
                        </tr>
                    })}
                </tbody>
            </Table>
                <AddProduct 
                showAddModal={showAddModal}
                hideAddModal={hideAddModal}
                fetchProducts={fetchProducts}
                />

            <EditProduct 
            showEditModal={showEditModal}
            hideEditModel={hideEditModel}
            selectedProduct={selectedProduct}
            fetchProducts={fetchProducts}
            />
        </div>
    )
}

export default Products