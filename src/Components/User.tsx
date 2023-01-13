import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Pagination from  './Pagination'

function User() {
  const [data, setData] = useState<any>([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [userid, setid] = useState("");


  const[showperPage,setShowPerPage]=useState(6);
  const[paginate,setPaginate]=useState({start:0,end:showperPage});

  const onPaginationChange=(start:any,end:any)=>{
   setPaginate({start:start,end:end});
  }

  
  const empty = () => {
    setemail("");
    setname("");
    setaddress("");
  };
  useEffect(() => {
    getlist();
  
  }, []);
  
  const getlist = () => {
    var requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://localhost:7198/User/GetAll", requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        setData(result);
       
      })
      .catch((error) => console.log("error", error));
  };

  const createuser = () => {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      email: email,
      address: address,
    });

    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://localhost:7198/User/Create", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        getlist();
      })
      .catch((error) => console.log("error", error));
    empty();
  };

  const deleteuser = (id: any) => {
    var requestOptions: any = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`https://localhost:7198/User/DeleteUsersById/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        getlist();
      })
      .catch((error) => console.log("error", error));
  };

  const getuserbyid = (id: any) => {
    setid(id);

    var requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://localhost:7198/User/GetUsers/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        console.log(result);
        setname(result.name);
        console.log(result.name);
        setemail(result.email);
        setaddress(result.address);
        getlist();
      })
      .catch((error) => console.log("error", error));
  };
  const updateuser = (userid: any) => {
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      email: email,
      address: address,
    });

    var requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`https://localhost:7198/User/EditUsersById/${userid}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        getlist()
        console.log(result);
      })
      .catch((error) => console.log("error", error));
    empty();
  };

  const buttons = () => {
    debugger
    if (!userid) {
      createuser();
      
    } else {
      updateuser(userid);
      
    }
  };

  return (
    <>
      <h1> Get Api Call</h1>
      <div className="col-1">
        <button
          type="button"
          className="btn btn-primary btn-lg mx-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          Create
        </button>
      </div>
      <Table border={2} hover>
        <tbody>
          <tr>
            <th>S.N</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
          {data.slice(paginate.start,paginate.end).map((item: any, i: any) => {
            return (
              <tr key={i}>
                <td>{i}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                    onClick={() => getuserbyid(item.id)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg mx-2"
                    onClick={() => deleteuser(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>
      </Table>
 
   <Pagination showPerpage={showperPage} onPaginationchange={onPaginationChange} total={data.length}/>


     

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={empty}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={address}
                    onChange={(e) => {
                      setaddress(e.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={empty}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={buttons}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
