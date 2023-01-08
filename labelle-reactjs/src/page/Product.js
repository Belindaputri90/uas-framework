import { React, useEffect, useState } from "react";
import { Button, Container, Table, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Product() {
  const [data, setData] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async (e) => {
    let token = sessionStorage.getItem("access_token");
    fetch("http://127.0.0.1:8000/api/get_prd", {
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
          setData(json);
        },
        (error) => {
          alert(error);
        }
      );
  };
  const edit = (id) => {
    history("/useredit", { state: { id } });
  };
  const deletef = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: "Akan menghapus data ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        let token = sessionStorage.getItem("access_token");
        fetch("http://127.0.0.1:8000/api/delete_prd/" + id, {
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
              Swal.fire("Deleted!", "Deleted Successfully.", "success");
              fetchProduct();
            },
            (error) => {
              alert(error);
            }
          );
      }
    });
  };

  return (
    <Container>
      <Row>
        <div style={{ marginTop: "100px" }}>
          <div md={12}>
            <Button onClick={() => history("/addproduct")}>Add Product</Button>
          </div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log(this.data)} */}
              {data.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.price}</td>
                  <td>{data.qty}</td>
                  <td>{data.image}</td>
                  {/* <td>
                    <img src={data.image}></img>
                  </td> */}
                  <td>
                    <Button onClick={(e) => edit(data.id)}>Edit</Button>
                    <Button
                      onClick={(e) => deletef(data.id)}
                      className="bg-danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Row>
    </Container>
  );
}
