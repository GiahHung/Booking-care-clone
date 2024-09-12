import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTION, LANGUAGES } from "../../../utils/constant";
import { getDetailDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      listDoctor: [],
      hasOldData: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.builtDataInputSelect(this.props.allDoctor);
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.builtDataInputSelect(this.props.allDoctor);
      this.setState({
        listDoctor: dataSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSelectedChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await getDetailDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.MarkDown && res.data.MarkDown.contentHTML && res.data.MarkDown.contentMarkDown && res.data.MarkDown.description) {
      let MarkDown = res.data.MarkDown;
      this.setState({
        contentHTML: MarkDown.contentHTML,
        contentMarkdown: MarkDown.contentMarkDown,
        description: MarkDown.description,
        hasOldData: true
      });
    } else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        hasOldData: false,
      });
    }
    console.log("check data: ", res);
  };

  handleSaveContentDoctor = () => {
    let {hasOldData} = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkDown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData == true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
    });
  };

  handleOnchangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  builtDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  render() {
    const { selectedDoctor, hasOldData } = this.state;
    // console.log("asasasasssas", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Thêm Thông Tin Bác Sĩ</div>
        <div className="more-info ">
          <div className="content-left form-group">
            <label>Chọn bác sĩ</label>
            <Select
              value={selectedDoctor}
              onChange={this.handleSelectedChange}
              options={this.state.listDoctor}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnchangeDescription(event)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-edit">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <div className="manage-doctor-save">
          <button
            className={hasOldData === true ? "btnSave" : "btnEdit"}
            onClick={() => this.handleSaveContentDoctor()}
          >
            <i class="fas fa-plus"></i>
            {hasOldData === true ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctor: state.admin.allDoctor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(actions.fetchUser()),
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
