import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function deleteCourseSuccess(courses) {
  console.log(courses);
  return {type: types.DELETE_COURSE_SUCCESS, courses};
}

export function searchCourseSuccess(course) {
  return {type: types.SEARCH_COURSE_SUCCESS, course};
}

export function searchCourse(courseTitle) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.searchCourse(courseTitle).then(course =>{
      dispatch(searchCourseSuccess(course));
    }).catch(error => {
      throw (error);
    });
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.deleteCourse(course.id).then((courses) => {
      dispatch(deleteCourseSuccess(courses));
    }).catch(error => {
      throw (error);
    });
  };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw (error);
    });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) :
        dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}
