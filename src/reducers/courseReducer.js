import * as types from '../actions/actionTypes';
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ];

    case types.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    case types.DELETE_COURSE_SUCCESS:
      const newState = Object.assign([], action.courses);
      return newState;

    case  types.SEARCH_COURSE_SUCCESS:
      let searchResultCourse = Object.assign([], action.course);
      return searchResultCourse;

    default:
      return state;
  }
}
