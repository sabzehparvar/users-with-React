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
    this.setState({ users: response.data.data, isLoading: false });
  }
  render() {
    return (
      <>
        <button className="btn btn-lg btn-primary" onClick={this.handleCreate}>
          Create
        </button>
        <div className="row">
          {this.state.isLoading ? (
            <LoadingUsers />
          ) : (
            this.state.users.map((user) => {
              return (
                <div className="col-4 text-center p-5">
                  <img
                    src={user.avatar}
                    style={{ borderRadius: "50%", width: "100px" }}
                    alt=""
                  />
                  <h4>
                    {user.first_name}{"  "}
                    {user.last_name}
                  </h4>
                  <h5>{user.email}</h5>
                  <div className="row">
                    <div className="col-6 ">
                      <button
                        className=" btn btn-info btn-sm"
                        onClick={() => {
                          this.handleUpdate(user);
                        }}
                      >
                        Update
                      </button>
                    </div>

                    <div className="col-6 ">
                      <button
                        className=" btn btn-danger btn-sm"
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
      </>
    );
  }

  handleCreate = async () => {
    const newUser = {
      first_name: "ali",
      last_name: "hoseyni",
      email: "kjsdcbk@gmail.com",
      avatar: "skjdckjds.jpg",
    };
    const response = await axios.post("https://reqres.in/api/users", newUser);
    this.setState({ users: [...this.state.users, newUser] });
  };
  handleUpdate = async (user) => {
    user.first_name = 'updated'
    const response = await axios.put(`https://reqres.in/api/users ${user.id}`)
    console.log(response);
    const updatedUsers= [...this.state.users];
    const index = updatedUsers.indexOf(user);
    updatedUsers[index]= {...user};
    this.setState({users:updatedUsers})
  };
  handleDelete = (user) => {};
}

export default Users;
