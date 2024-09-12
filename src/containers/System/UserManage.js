import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUser,
  createNewUserService,
  deleteUser,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isModalOpen: false,
      isModalEditOpen: false,
      userEdit: [],
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let response = await getAllUser("All");
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrUser: response.user,
        },
        () => {
          console.log("check user 2", this.state.arrUser);
        }
      );
      console.log("check user 1", this.state.arrUser);
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  toggleModalUser = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  toggleModalEditUser = () => {
    this.setState({
      isModalEditOpen: !this.state.isModalEditOpen,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isModalOpen: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUser(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (error) {}
  };

  handleEditUser = (user) => {
    this.setState({
      isModalEditOpen: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        await this.getAllUserFromReact();
        this.setState({
          isModalEditOpen: false,
        });
      } else {
        alert(res.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isModalOpen}
          toggleFromParent={this.toggleModalUser}
          createNewUser={this.createNewUser}
        />
        {this.state.isModalEditOpen && (
          <ModalEditUser
            isOpen={this.state.isModalEditOpen}
            toggleFromParent={this.toggleModalEditUser}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">Manage User With Ace</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="user-table">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            {arrUser &&
              arrUser.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i class="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
