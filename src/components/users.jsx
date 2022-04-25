import React, { Component } from "react";
import axios from "axios";
import LoadingUsers from "./loading/loadingUsers";

class Users extends Component {
  state = {
    users: [],
    isLoading: true,
  };
  async componentDidMount() {
    const response = await axios.get("https://reqres.in/api/users");
    setTimeout(() => {
      this.setState({ users: response.data.data, isLoading: false });
    }, 2000);
  }
  render() {
    return (
      <>
        <div className="container">
          <p
            className=" p-3 alert alert-info rounded-pill m-2"
            style={{ "text-align": "center", direction: "rtl" }}
          >
            {" "}
            این صفحه skeleton loading دارد و از قصد کاربران با تاخیر لود می شوند
            تا بتوانید این لودینگ را ببینید
          </p>
          <div className="text-center p-4">
            <button
              className="btn btn-lg btn-outline-primary text-center"
              onClick={this.handleCreate}
            >
              ایجاد کاربر جدید
            </button>
          </div>
          <div className="row">
            {this.state.isLoading ? (
              <LoadingUsers />
            ) : (
              this.state.users.map((user) => {
                return (
                  <div className="col-lg-4 col-md-6 col-sm-12 text-center p-5">
                    <img
                      src={user.avatar}
                      style={{ borderRadius: "50%", width: "100px" }}
                      alt=""
                    />
                    <h4 className=" mt-2 text-warning">
                      {user.first_name}
                      {"  "}
                      {user.last_name}
                    </h4>
                    <h5 className="text-dark">{user.email}</h5>
                    <p className="text-success">{user.status}</p>
                    <div className="row">
                      <div className="col-6 ">
                        <button
                          className=" btn btn-outline-info btn-sm"
                          onClick={() => {
                            this.handleUpdate(user);
                          }}
                        >
                          Update
                        </button>
                      </div>

                      <div className="col-6 ">
                        <button
                          className=" btn btn-outline-danger btn-sm"
                          onClick={() => {
                            this.handleDelete(user);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <p
            className=" p-3 alert alert-primary rounded-top m-2 mb-5"
            style={{ "text-align": "center", direction: "rtl" }}
          >
            اطلاعات کاربران از این api گرفته می شود ==
            ("https://reqres.in/api/users")
          </p>
        </div>
      </>
    );
  }

  handleCreate = async () => {
    const newId = Math.ceil(Math.random() * 5) + 6;
    const newUser = await axios.get(`https://reqres.in/api/users/${newId}`);
    this.setState({ users: [...this.state.users, newUser.data.data] });
  };
  handleUpdate = async (user) => {
    user.status = "updated";
    const response = await axios.put(`https://reqres.in/api/users ${user.id}`);
    const updatedUsers = [...this.state.users];
    const index = updatedUsers.indexOf(user);
    updatedUsers[index] = { ...user };
    this.setState({ users: updatedUsers });
  };
  handleDelete = (user) => {
    const id = user.id;
    const users = [...this.state.users];

    const newUsers = users.filter((user) => {
      return user.id !== id;
    });
    this.setState({ users: newUsers });
  };
}

export default Users;
