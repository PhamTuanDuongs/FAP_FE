import { Course } from "../types/Course";
import { LoginDTO } from "../types/Login";
import { PREFIX_URL } from "./api";

export async function LoginAPI(login: LoginDTO) {
  try {
    console.log(login);

    const res = await fetch(`${PREFIX_URL + "/Login/token"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    const token = await res.text(); 
    return {
      token: token,
      statusCode: res.status,
    };
  } catch (err) {
    console.log(err);
  }
}
