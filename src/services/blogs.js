import axios from "axios";
const baseUrl = "/api/blogs";

let token = "";

const setToken = (newToken) => (token = `Bearer ${newToken}`);

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createBlog = async (data) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.post(baseUrl, data, config);
  return res.data;
};

const updateBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  if (blog.user && blog.user.id) {
    blog.user = blog.user.id;
  }
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return res.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export default { setToken, getAll, createBlog, updateBlog, deleteBlog };
