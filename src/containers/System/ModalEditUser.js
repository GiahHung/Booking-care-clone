import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashcode",
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnchange = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValueInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleEdit = () => {
    let isValid = this.checkValueInput();
    if (isValid === true) {
      // call API
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => {
            this.toggle();
          }}
          className={"modal-user-container"}
          size="lg"
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            Edit User
          </ModalHeader>
          <ModalBody>
            <div className="user-container">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="text"
                  value={this.state.email}
                  disabled
                  onChange={(event) => {
                    this.handleOnchange(event, "email");
                  }}
                ></input>
              </div>
              <div className="input-container">
                <label>First Name</label>
                <input
                  type="text"
                  value={this.state.firstName}
                  onChange={(event) => {
                    this.handleOnchange(event, "firstName");
                  }}
                ></input>
              </div>
              <div className="input-container">
                <label>Last Name</label>
                <input
                  type="text"
                  value={this.state.lastName}
                  onChange={(event) => {
                    this.handleOnchange(event, "lastName");
                  }}
                ></input>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.handleEdit();
              }}
            >
              Edit
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                this.toggle();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
