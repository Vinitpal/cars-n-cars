import { api_path } from "../db/path";

export const getBlog = async () => {
  try {
    const endpoint = await fetch(`${api_path}/api/v1/blogs/list`);
    const res = await endpoint.json();

    return res;
  } catch (error) {
    console.log(error);
  }
};
