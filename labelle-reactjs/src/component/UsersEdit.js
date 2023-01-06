import React from "react";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
export default function UsersEdit() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const loc = useLocation();
  const UserId = loc.state.id;
  useEffect(() => {
    fetchUsersEdit();
  }, []);
  const fetchUsersEdit = async (e) => {
    let token = sessionStorage.getItem("access_token");
    fetch("http://127.0.0.1:8000/api/get_users_by_id/" + UserId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (json) => {
          setName(json.users[0].name);
          setEmail(json.users[0].email);
        },
        (error) => {
          alert(error);
        }
      );
  };
  const UpdateUser = async (e) => {
    const token = sessionStorage.getItem("access_token");
    e.preventDefault();
    e.preventDefault();
    let result = await fetch("http://127.0.0.1:8000/api/update_user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        id: UserId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Update Success",
          showConfirmButton: false,
          timer: 1500,
        });
        history("/users");
      });
  };
  return (
    <div className="container mt-4 shadow-sm p-3 mb-5 bg-white rounded">
      <Form onSubmit={UpdateUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name </Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Form.Text className="text-muted"> </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>

          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Text className="text-muted"> </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
