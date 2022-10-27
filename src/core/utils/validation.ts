import { JobOptions } from "./job";

export const queryValidation = (data: any): Promise<void> => {
  console.log(data);
  let query: any = {};

  if (data.where) query.where = JSON.parse(data.where);
  if (data.attribute) query.attributes = JSON.parse(data.attributes);
  if (data.offset) query.offset = parseInt(data.offset) || 0;
  if (data.limit) query.limit = parseInt(data.limit) || 10;
  if (data.sort) {
    const jsonData = JSON.parse(data.sort);
    let sort: any = [];
    for (let key in jsonData) {
      sort.push([key, jsonData[key].toUpperCase()]);
    }
    query.sort = sort
  };
  // if (data.populate){
  //   const jsonData = JSON.parse(data.populate);
  //   console.log(jsonData);
    
  //   // query.populate
  // };
  // if (data.include) query.include?: any[];
  // if (data.group query.group?: any;
  // if (data.having) query.having?: any;

  return query;
};
