import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ProductManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };
    this.listenEmitter();
  }

  listenEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });
    });
  };

  componentDidMount() {}

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

  handleAddNew = () => {
    let isValid = this.checkValueInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
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
            Add New User
          </ModalHeader>
          <ModalBody>
            <div className="user-container">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="text"
                  value={this.state.email}
                  onChange={(event) => {
                    this.handleOnchange(event, "email");
                  }}
                ></input>
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={(event) => {
                    this.handleOnchange(event, "password");
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
                this.handleAddNew();
              }}
            >
              Add New
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
