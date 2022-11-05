export interface LoginLog {
  _id?: string;
  name?: string;
  user_id?: number;
  _v?: any;
}

export interface LoginLogGetAllResponse {
    loginLog: LoginLog[];
    count: number;
    limit: number;
    offset: number;
}
