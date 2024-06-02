import Api from "./Api.js";

const getThreads = async () => {
  return Api.req("GET", "/threads");
};
export default getThreads;

export async function newThread(data) {
  return Api.req("POST", "/threads", data);
}

export async function newComment(thread, data) {
  return Api.req("POST", `/threads/${thread._id}/comments`, data);
}
