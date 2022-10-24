import { Job, JobResponse } from "../../utils/job";

export class DataService {
  constructor(private readonly model: any) {}

  async createRecord(job: Job): Promise<JobResponse> {
    job.id;
    console.log("?????????????????JOB");
    console.log(job);
    console.log("?????????????????JOB");
    
    
    const data = await this.model.create(job.body);
    return { data: data};
  }

  async getAllRecords(job: Job): Promise<JobResponse> {
    console.log(job);
    const data = await this.model.findAll();
    console.log(data);

    return { data: "Get all" };
  }
}
