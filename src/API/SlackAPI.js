import axios from "axios";
import { authActions } from "../Store/authSlice";

let domain = "http://206.189.91.54";
const URL = `${domain}/api/v1`;

// Register User
export const registerUser = async (config, updateFnc) => {
  try {
    let res = await axios.post(`${URL}/auth`, config.body);
    console.log(res);
    // let headers = {
    //   "access-token": res.headers["access-token"],
    //   client: res.headers.client,
    //   expiry: res.headers.expiry,
    //   uid: res.headeres.uid,
    // };
    // localStorage.setItem("headers", JSON.stringify(headers));

    // let user = {
    //   email: res.data.data.email,
    //   id: res.data.data.id,
    //   uid: res.data.data.uid,
    // };
    // localStorage.setItem("users", JSON.stringify(user));

    // dispatch(authActions.login());
  } catch (error) {
    console.log(error.response.data.errors);
    let errorRes = error.response.data.errors;

    errorRes.email && updateFnc.setEmailValid(false);
    errorRes.email && updateFnc.setEmailError(`Email ${errorRes.email}`);

    // errorRes.password &&
    //   updateFnc.setPasswordError(`Password ${errorRes.password}`);
    // errorRes.password_confirmation &&
    //   updateFnc.setConfirmError(
    //     `Password confirmation ${errorRes.password_confirmation}`
    //   );
  }
};
