import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import HTTP from './axiosConfig'
// import Products from './Products';

function AddProduct(props) {
    const [singleProduct, setsingleProduct] = useState(
        {
            productName: "",
            productPrice: "",
            productDescription: "",
            productImageURL: "",
        }
    )

    // console.log("SINGLEPRODUCT",singleProduct);

    let handleClose = () => {
        props.hideAddModal()
    }

    let updateSingleProduct = (event) => {
        setsingleProduct({
            ...singleProduct,
            [event.target.name]: event.target.value,
        })
    }

    let addProduct = async () => {
        try {
            let response = await HTTP.post("/api/products", singleProduct)
            if (response.data.error) {
                alert(response.data.message)
                console.log("response", response);
            } else {
                alert(response.data.message)
                console.log("response", response);
                handleClose()
                setsingleProduct({
                    productName: "",
                    productPrice: "",
                    productDescription: "",
                    productImageURL: "",
                });
                props.fetchProducts();
            }
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div>
            <Modal show={props.showAddModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control name='productName' type="text" placeholder="Product Name" value={singleProduct.productName} onChange={updateSingleProduct} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control name='productPrice' type="text" placeholder="Product Price" value={singleProduct.productPrice} onChange={updateSingleProduct} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control name='productDescription' type="text" placeholder="Product Description" value={singleProduct.productDescription} onChange={updateSingleProduct} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control name='productImageURL' type="text" placeholder="Product Image" value={singleProduct.productImageURL} onChange={updateSingleProduct} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addProduct}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddProduct