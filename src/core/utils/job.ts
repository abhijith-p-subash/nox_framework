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
  payload?: any;
  inputSketch?: any;
  outputSketch?: any;
  body?:{ [key:string]: any};
  response?: JobResponse;
  model?: any;
  status: 'Pending' | "Completed" | "Errored";


  constructor(job:any) {
    job = job || {};
    this.id = job.id || null;
    this.payload = job.paylaod || {};
    this.inputSketch = job.inputSketch || {};
    this.outputSketch = job.outputSketch || {};
    this.body = job.body || {};
    this.model = job.model || {};
    this.response = job.response || {};
    this.status = job.status || "Pending"
  }
}
