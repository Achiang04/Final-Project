import Axios from 'axios';
import * as types from '../Constant/actionType';
import {BASE_URL} from '../Constant/general';
import AsyncStorage from '@react-native-community/async-storage';

export const getRequest = () => ({
  type: types.GET_REQUEST,
});

export const getSuccess = (data) => ({
  type: types.GET_SUCCESS,
  dataAction: data,
});

export const getFailure = (error) => ({
  type: types.GET_FAILURE,
  error,
});

export const editProfileAction = (name, phone) => {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem('userToken');
    try {
      dispatch(getRequest());
      const response = await Axios.put(`${BASE_URL}user/edit`, {
        headers: {
          access_token: value,
        },
        name,
        phone,
      });
      dispatch(getSuccess(response));
      return true;
    } catch (error) {
      dispatch(getFailure(error));
      return false;
    }
  };
};
