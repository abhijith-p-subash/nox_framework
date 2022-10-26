import { JobOptions } from "./job";

export const queryValidation = (data: any): Promise<JobOptions> => {
  console.log(data);
  let query: any = {};
  for (const key in data) {
    console.log(`${key} : ${data[key]}`);
    query[key] = JSON.parse(data[key]);
  }
  console.log(query);
  return query;
};
