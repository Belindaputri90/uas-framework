import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddProduct() {
  const [productInput, setProduct] = useState({
    name: "",
    price: "",
    qty: "",
  });
  const [picture, setPicture] = useState([]);
  const [errorlist, setError] = useState([]);
  const history = useNavigate();

  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleImage = (event) => {
    setPicture(event.target.files[0]);
  };

  const Addproduct = async (e) => {
    e.preventDefault();

    let token = sessionStorage.getItem("access_token");
    var iniHeaders = new Headers();
    iniHeaders.append("Authorization", "Bearer " + token);

    const formData = new FormData();
    formData.append("image", picture);
    formData.append("name", productInput.name);
    formData.append("price", productInput.price);
    formData.append("qty", productInput.qty);

    var requestOptions = {
      method: "POST",
      headers: iniHeaders,
      body: formData,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/api/create_prd", requestOptions).then(
      (res) => {
        if(true){
          Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Add Product Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        history("/product");
        }
      }
    );
  };

  return (
    <div className="container mt-4 shadow-sm p-3 mb-5 bg-white rounded">
      <Form onSubmit={Addproduct} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name </Form.Label>
          <Form.Control
            type="name"
            name="name"
            placeholder="Enter Product Name"
            onChange={handleInput}
            value={productInput.name}
          />
          <Form.Text className="text-danger">{errorlist.name}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            placeholder="Enter Product Price"
            onChange={handleInput}
            value={productInput.price}
          />
          <Form.Text className="text-danger">{errorlist.price}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="text"
            name="qty"
            placeholder="Enter Quantity Product"
            onChange={handleInput}
            value={productInput.qty}
          />
          <Form.Text className="text-danger">{errorlist.qty}</Form.Text>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image Product</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImage} />
          <Form.Text className="text-danger">{errorlist.image}</Form.Text>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
