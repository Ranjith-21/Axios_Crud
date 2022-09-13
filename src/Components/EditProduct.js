import React, { useEffect, useState } from 'react'
import { Form, Modal , Button } from 'react-bootstrap'
import HTTP from './axiosConfig'

function EditProduct(props) {

    const [singleProduct, setsingleProduct] = useState(
        {
            productName: "",
            productPrice: "",
            productDescription: "",
            productImageURL: "",
        }
    )

    useEffect(()=>
    {
        setsingleProduct({...props.selectedProduct})
    },[props.selectedProduct])

    // console.log("edit props",props.selectedProduct);

    let updateSingleProduct = (event) => {
        setsingleProduct({
            ...singleProduct,
            [event.target.name]: event.target.value,
        })
    }

    let handleClose=()=>
    {
        props.hideEditModel()
    }

    let editProduct=async()=>
    {
        try {
            let response = await HTTP.put(`/api/products/${props.selectedProduct._id}`, singleProduct)
            if (response.data.error) {
                alert(response.data.message)
                // console.log("edit response",response);
            } else {
                alert(response.data.message)
                // console.log("edit response",response);
                handleClose()
                props.fetchProducts()
                // console.log("edit response",response);
            }
        } catch (err) {
            alert(err.message)
        }
    }
  return (
    <div>
 <Modal show={props.showEditModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
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
                <Button variant="primary" onClick={editProduct}>
                    Edit Product
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default EditProduct