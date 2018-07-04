import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import CourseList from '../course/CourseList';
import {connect} from "react-redux";
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from "redux";
import toastr from "toastr";

class SearchCoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      courses: Object.assign({}, this.props.courses),
      keyWords: '',
      errors: {},
      searching: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.searchCourse = this.searchCourse.bind(this);
  }

  componentWillUnmount(){
    this.props.actions.searchCourse('');
  }

  updateCourseState(event) {
    //each form field has a name, remember to bind
    const courseKeyWords= event.target.value;
    this.setState({keyWords: courseKeyWords});
    this.props.actions.searchCourse(courseKeyWords).
    then(() => this.courseFound())
      .catch(error => {
        this.setState({searching: false});
        toastr.error(error);
      });
  }

  searchCourse(event) {
    event.preventDefault();
    this.setState({searching: true});
    this.props.actions.searchCourse(this.state.keyWords).
    then(() => this.courseFound())
      .catch(error => {
        this.setState({searching: false});
        toastr.error(error);
      });
  }

  courseFound() {
    if(this.props.courses.length == 0) {
      toastr.error("Search did not return any course");
    }
    this.setState({searching: false});
  }

  render() {
    const {courses} = this.props;
    return (
      <div>
        <h1>Search Courses</h1><br/>
        <form>
          <TextInput
            name="search"
            placeholder="Search by course title, author and category..."
            onChange={this.updateCourseState}
          />
          <input
            type="submit"
            name="search"
            disabled={this.state.searching}
            value={this.state.searching ? 'Searching...' : 'Search'}
            className="btn btn-primary"
            onClick={this.searchCourse}
          />
        </form>
        <CourseList courses={courses}/>
      </div>
    );
  }


}

SearchCoursesPage.propTypes = {
  keyWords: PropTypes.string.isRequired,
  courses: PropTypes.object,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCoursesPage);
