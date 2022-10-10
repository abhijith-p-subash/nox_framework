import { Job, JobResponse } from "../../utils/job";

export abstract class DataService {
  //   constructor(parameters) {}

  async createRecord(job: Job): Promise<JobResponse> {
    job.id;
    const data = await job.model.create(job.body);
    return { data: "done" };
  }
}
