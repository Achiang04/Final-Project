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

export const profileAction = async () => {
  const value = await AsyncStorage.getItem('userToken');

  try {
    const response = await Axios.get(
      'https://vet-booking.herokuapp.com/user/edit',
      {
        headers: {
          access_token: value,
        },
      },
    );
    dispatch(getSuccess(response.data.data));
  } catch (error) {
    dispatch(getFailure(error));
  }
};
