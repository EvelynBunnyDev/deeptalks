import Api from "./Api.js";

const getJournals = async () => {
  return Api.req("GET", "/journal");
};
export default getJournals;

export async function newJournal(data) {
  return Api.req("POST", "/journal", data);
}
