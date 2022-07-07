import axios from "axios";

const baseUrl = "/api/persons";

function getAll() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function create(newObject) {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
}

function update(id, updatedObject) {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject);
  return request.then((response) => response.data);
}

function remove(id) {
  return axios.delete(`${baseUrl}/${id}`);
}

const exportObject = {
  getAll,
  create,
  remove,
  update,
};

export default exportObject;
