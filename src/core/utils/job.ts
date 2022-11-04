export interface JobOptions {
  search?: string;
  where?: any;
  select?: string[];
  attributes?: any;
  populate?: string | any[];
  include?: any[];
  sort?: any;
  group?: any;
  fields?: string[];
  distinct?:boolean;
  having?: any;
  offset?: number;
  limit?: number;
  allowEmpty?: boolean;
  hardDelete?: boolean;
  withDeleted?: boolean;
}
export interface JobResponse {
  error?: any;
  data?: any;
  message?: string;
  created?: boolean;
  previousData?: any;
  offset?: number;
  limit?: number;
  count?: number;
}

export class Job {
  id?: number | string;
  uid?: string;
  owner?: any;
  action?: string;
  payload?: any;
  body?: { [key: string]: any };
  options?: JobOptions;
  response?: JobResponse | any;
  status: "Pending" | "Completed" | "Errored";

  constructor(job: any) {
    job = job || {};
    this.id = job.id || null;
    this.uid = job.uid || null;
    this.action = job.actions || null;
    this.payload = job.paylaod || {};
    this.body = job.body || {};
    this.options = job.options || {};
    this.response = job.response || {};
    this.status = job.status || "Pending";
  }
}
