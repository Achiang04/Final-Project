import * as types from '../Constant/actionType';
const initialState = {
  loading: false,
  error: null,
  dataReducer: [],
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
      break;
    case types.GET_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        dataReducer: action.dataAction.data,
      });
      break;
    case types.GET_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
      break;
    default:
      return state;
  }
}

export default authReducer;
