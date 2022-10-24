import { Job, JobResponse } from "../../utils/job";

export class DataService {
  constructor(private readonly model: any) {}

  async createRecord(job: Job): Promise<JobResponse> {
    job.id;
    const data = await this.model.create(job.body);
    return { data: data};
  }

  async getAllRecords(job: Job): Promise<JobResponse> {
    console.log(job);

    const data = await this.model.findAndCountAll();
    // const data = await this.model.findAll();
    console.log(data.rows);
    return {data: data.rows, count:data.count}

    return { data: "Get all" };
  }
}
