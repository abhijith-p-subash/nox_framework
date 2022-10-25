import { Job, JobResponse } from "../../utils/job";

export class DataService {
  constructor(private readonly model: any) {}

  async createRecord(job: Job): Promise<JobResponse> {
    try {
      const data = await this.model.create(job.body);

      return { data: data };
    } catch (error) {
      return { error };
    }
  }

  async getAllRecords(job: Job): Promise<JobResponse> {
    try {
      const data = await this.model.findAndCountAll();
      return { data: data.rows, count: data.count };
    } catch (error) {
      return { error };
    }
  }
}
