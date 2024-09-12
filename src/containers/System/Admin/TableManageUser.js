import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
    };
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        arrUser: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (userId) => {
    this.props.deleteUserStart(userId.id);
  };

  handleEditUser = (userId) => {
    this.props.handleEditUserFromParent(userId);
  };

  render() {
    // console.log('fetch user: ', this.props.listUsers)
    let listUser = this.state.arrUser;
    return (
      <React.Fragment>
        <table id="tableManageUser">
          <tr>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={index}>
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
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(actions.fetchUser()),
    deleteUserStart: (id) => dispatch(actions.deleteUserStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
