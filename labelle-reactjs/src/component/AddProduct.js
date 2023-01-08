import React from "react";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useNavigate();

  const Addproduct = async (e) => {
    e.preventDefault();
    let token = sessionStorage.getItem("access_token");
    let result = await fetch("http://127.0.0.1:8000/api/create_prd", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        price: price,
        qty: qty,
        image: image,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Add Product Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        history("/product");
      });
  };

  return (
    <div className="container mt-4 shadow-sm p-3 mb-5 bg-white rounded">
      <Form onSubmit={Addproduct} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name </Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Quantity Product"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image Product</Form.Label>
          <Form.Control
            type="file"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
