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

export const loginAction = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(getRequest());
      const response = await Axios.post(`${BASE_URL}user/login`, {
        email,
        password,
      });
      dispatch(getSuccess(response));
      await AsyncStorage.setItem('userToken', response.data.access_token);
      return true;
    } catch (error) {
      dispatch(getFailure(error));
      return false;
    }
  };
};
