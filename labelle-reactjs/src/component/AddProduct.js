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

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };
  
  console.log("picture", picture);
  
  const Addproduct = async (e) => {
    e.preventDefault();
    let token = sessionStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("name", productInput.name);
    formData.append("price", productInput.price);
    formData.append("qty", productInput.qty);

    axios
      .post("http://127.0.0.1:8000/api/create_prd", formData, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.status === 200) {
          Swal("Success", res.data.message, "success");
          setError([]);
        } else if (res.data.status === 422) {
          Swal("All Fields are mandatory", "", "error");
          setError(res.data.errors);
        }
      });
    // axios
    //   .post("http://127.0.0.1:8000/api/create_prd", formData, {
    //     headers: headers,
    //     body: JSON.stringify({
    //       formData
    //     }),
    //   })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     Swal.fire({
    //       position: "top-center",
    //       icon: "success",
    //       title: "Add Product Successfully",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     history("/product");
    //   });

    // let result = await fetch("http://127.0.0.1:8000/api/create_prd", formData, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // }).then((res) => {
    //   if (res.data.status === 200) {
    //     Swal("Success", res.data.message, "success");
    //     setError([]);
    //   } else if (res.data.status === 422) {
    //     Swal("All Fields are mandatory", "", "error");
    //     setError(res.data.errors);
    //   }
    // });
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
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image Product</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImage} />
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
