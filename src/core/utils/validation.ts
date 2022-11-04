export const queryValidation = (data: any): Promise<void> => {
  let query: any = {};
  if (data.where) query.where = JSON.parse(data.where);
  if (data.attribute) query.attributes = JSON.parse(data.attributes);
  if (data.offset) query.offset = parseInt(data.offset) || 0;
  if (data.limit) query.limit = parseInt(data.limit) || 10;
  if (data.sort) query.sort = [data.sort] || [];
  if (data.populate) query.populate = data.populate || [];
  if (data.include) query.include = data.include || [];
  if (data.hardDelete) query.hardDelete = isStringBoolean(data.hardDelete);
  // if (data.group query.group?: any;
  // if (data.having) query.having?: any;
  return query;
};

export const isEmptyObject = (obj: any) => {
  for (let key in obj) {
    if (obj[key]) return false;
  }
  return true;
};


export const isStringBoolean = (val: string | boolean) => {
  if (val === 'true') return true;
  if (val === 'false') return false;
}
