import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { LANGUAGES, CRUD_ACTION } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
import CommonUtils from "../../../utils/CommonUtils";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleIdArr: [],

      previewImg: "",
      isPreviewOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      roleId: "",
      position: "",
      avatar: "",

      action: "",
      editUserId: "",
    };
  }

  async componentDidMount() {
    this.props.getGender();
    this.props.getPosition();
    this.props.getRole();

    // try {
    //   let res = await getAllCode("gende");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    //   console.log("asasas", res);
    // } catch (e) {
    //   console.log(e);
    // }
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleIdArr: arrRole,
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        roleId: "",
        position: "",
        avatar: "",
        action: CRUD_ACTION.CREATE,
        previewImg: "",
      });
    }
  }

  handleOnchangePreviewImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      // console.log("base 64: ", base64)
      this.setState({
        previewImg: objectUrl,
        avatar: base64,
      });
    }
  };

  handlePreviewOpen = () => {
    this.setState({
      isPreviewOpen: true,
    });
  };

  handleOnclickSave = () => {
    let validate = this.checkValidate();
    if (validate === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTION.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTION.EDIT) {
      this.props.editUserStart({
        id: this.state.editUserId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }

    console.log("Save: ", this.state);
  };

  checkValidate = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("This input is require: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      }
      //, () =>{
      //   console.log("check value input: ", this.state)
      // }
    );
  };

  handleEditUserFromParent = (user) => {
    // console.log("vbbbbbbb: ", user);
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = Buffer.from(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "asasasasass",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      roleId: user.roleId,
      position: user.positionId,
      previewImg: imageBase64,

      action: CRUD_ACTION.EDIT,
      editUserId: user.id,
    });
  };

  render() {
    // console.log("check gender from redux:", this.props.genderRedux);
    let language = this.props.language;
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roleIds = this.state.roleIdArr;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      roleId,
      position,
      avatar,
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title">Manage User REDUX</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3 add-new-user">
                <FormattedMessage id="user-manage.add" />
              </div>

              <div className="col-3 mt-3">
                <label>
                  <FormattedMessage id="user-manage.email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "email");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTION.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3 mt-3">
                <label>
                  <FormattedMessage id="user-manage.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "password");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTION.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3 mt-3">
                <label>
                  <FormattedMessage id="user-manage.first-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "firstName");
                  }}
                />
              </div>
              <div className="col-3 mt-3">
                <label>
                  <FormattedMessage id="user-manage.last-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "lastName");
                  }}
                />
              </div>
              <div className="col-3 mt-3">
                <label>
                  <FormattedMessage id="user-manage.phone-number" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-9 mt-3">
                <label>
                  <FormattedMessage id="user-manage.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-4 mt-3">
                <label>
                  <FormattedMessage id="user-manage.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "gender");
                  }}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mt-3">
                <label>
                  <FormattedMessage id="user-manage.role" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "roleId");
                  }}
                  value={roleId}
                >
                  {roleIds &&
                    roleIds.length > 0 &&
                    roleIds.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mt-3">
                <label>
                  <FormattedMessage id="user-manage.position" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "position");
                  }}
                  value={position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 mt-3 mb-5 upload-image">
                <label>
                  <FormattedMessage id="user-manage.image" />
                </label>
                <div className="image">
                  <input
                    id="upload"
                    type="file"
                    className="form-control"
                    hidden
                    onChange={(event) => {
                      this.handleOnchangePreviewImg(event);
                    }}
                  />
                  <div
                    className="preview-img"
                    style={{ backgroundImage: `url(${this.state.previewImg})` }}
                    onClick={() => {
                      this.handlePreviewOpen();
                    }}
                  ></div>
                  <label htmlFor="upload" className="upload-btn">
                    Tải ảnh<i className="fas fa-upload"></i>
                  </label>
                </div>
              </div>
              <div
                className={
                  this.state.action === CRUD_ACTION.EDIT
                    ? "col-9  btnEdit"
                    : "col-9  btnSave"
                }
              >
                <button
                  onClick={() => {
                    this.handleOnclickSave();
                  }}
                >
                  {this.state.action === CRUD_ACTION.EDIT ? (
                    <div>
                      <i class="fas fa-plus"></i>
                      <FormattedMessage id="user-manage.edit" />
                    </div>
                  ) : (
                    <div>
                      <i class="fas fa-plus"></i>
                      <FormattedMessage id="user-manage.save" />
                    </div>
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.isPreviewOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImg}
            onCloseRequest={() => this.setState({ isPreviewOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roleIds,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(actions.fetchGender()),
    getPosition: () => dispatch(actions.fetchPosition()),
    getRole: () => dispatch(actions.fetchRole()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    editUserStart: (data) => dispatch(actions.editUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
