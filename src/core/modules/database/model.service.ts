import { DataService } from "./database.service";
import { Op } from "sequelize";
import { Job, JobResponse } from "../../utils/job";

export abstract class ModelService extends DataService {
  constructor(model: any) {
    super(model);
  }
  async doBeforeRead(job: Job): Promise<void> {
    job.response.error = false;
  }

  async doAfterRead(job: Job): Promise<void> {
    job.response.error = false;
  }

  async doBeforeWrite(job: Job): Promise<void> {
    job.response.error = false;
  }

  async findAll(job: Job): Promise<JobResponse> {
    try {
      await this.doBeforeRead(job);
      job.response = await this.getAllRecords(job);
      await this.doAfterRead(job);
      console.log();

      return job.response;
    } catch (error) {
      return { error };
    }
  }

  async create(job: Job): Promise<JobResponse> {
    try {
      console.log("//////////////JJOB");
      console.log(job);
      console.log("//////////////////JJBB");
      
      
      
      await this.doBeforeWrite(job);
      const data = this.createRecord(job)
      return { data: data };
    } catch (error) {
      return { error };
    }
  }
}
