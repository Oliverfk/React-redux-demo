import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as courseActions from '../../actions/courseActions';
import CourseForm from "./CourseForm";
import toastr from 'toastr';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {confirmAlert} from 'react-confirm-alert';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
  }

  //make sure after refresh the data is still in the form
  componentWillReceiveProps(prevProps) {
    if (this.props.course.id != prevProps.course.id) {
      this.setState({course: Object.assign({}, prevProps.course)});
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.course.id != prevProps.course.id) {
  //     this.fetchData(this.props.course);
  //   }
  // }

  updateCourseState(event) {
    //each form field has a name, remember to bind
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    // console.log("course[" + field +"]: "+ course[field]);
    return this.setState({course: course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    //using ".then" to wait utill the promise object load all the data first then go to redirect
    this.props.actions.saveCourse(this.state.course).
    then(() => this.redirectSave())
      .catch(error => {
        this.setState({saving: false});
        this.props.actions.ajaxCallError();
        toastr.error(error);
      });
  }

  deleteCourse(event) {
    event.preventDefault();
    // console.log(this.state.course.id);
    this.props.actions.deleteCourse(this.props.course);
    this.context.router.push('/courses');
    toastr.success('Course Deleted');
    // then(() => this.redirectDelete()).
    // catch(error => {
    //   toastr.error(error);
    // });
  }

   deleteConfirm(event) {
    event.preventDefault();
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this course?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteCourse(event)
        },
        {
          label: 'No',
          onClick: () => this.doNothing(event)
        }
      ]
    });
  }

  redirectDelete() {

    this.context.router.push('/courses');
  }

  redirectSave() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }


  render() {
    return (
      <div>
        <h1>Manage Course</h1>
        <CourseForm
          course={this.state.course}
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          onDelete={this.deleteConfirm}
          saving={this.state.saving}
          errors={this.state.errors}/>
      </div>
    );
  }

  doNothing(event) {
    return undefined;
  }
}

//PropTypes: address linting errors
ManageCoursePage.propTypes = {
  course: PropTypes.object,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

//Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, courseId) {
  //since filter returns an array object, here to grab the first.
  const course = courses.filter(course => course.id == courseId);
  if (course.length) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id;//from the path '/course/:id'
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  //if a courseId is available
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

