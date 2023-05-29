import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/trains");
  }

  get(id) {
    return http.get(`/trains/${id}`);
  }

  create(data) {
    return http.post("/trains", data);
  }

  update(id, data) {
    return http.put(`/trains/${id}`, data);
  }

  delete(id) {
    return http.delete(`/trains/${id}`);
  }

  deleteAll() {
    return http.delete(`/trains`);
  }

  findByTitle(title) {
    return http.get(`/trains?name=${title}`);
  }
}

export default new TutorialDataService();