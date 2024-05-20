import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../API/endpoints";


export const loginUser = createAsyncThunk("auth/login", async (formData) => {
    try {
      const respose = await login(formData)
      return respose.data;
    } catch (err) {
      console.log(err, "error during fetching post data");
      return err;
    }
  });
