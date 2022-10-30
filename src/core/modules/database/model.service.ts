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

  async doBeforeWrite(job: Job): Promise<void> {
    job.response.error = false;
  }

  async doBeforeDelete(job: Job): Promise<void> {
    job.response.error = false;
  }

  async create(job: Job): Promise<JobResponse> {
    try {
      await this.doBeforeWrite(job);
      if (!!job.response.error) return job.response;
      job.response = this.createRecord(job);
      if (!!job.response.error) return job.response;
      await this.doAfterWrite(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  async findAll(job: Job): Promise<JobResponse> {
    try {
      await this.doBeforeRead(job);
      job.response = await this.getAllRecords(job);
      await this.doAfterRead(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  async findById(job: Job): Promise<JobResponse> {
    try {
      await this.doAfterRead(job);
      if (!!job.response.error) return job.response;
      job.response = await this.findRecordById(job);
      if (!!job.response.error) return job.response;
      await this.doAfterRead(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  async findOne(job: Job): Promise<JobResponse> {
    try {
      await this.doAfterRead(job);
      if (!!job.response.error) return job.response;
      job.response = await this.findOneRecord(job);
      if (!!job.response.error) return job.response;
      await this.doAfterRead(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  async getCount(job: Job): Promise<JobResponse> {
    try {
      await this.doBeforeRead(job);
      if (!!job.response.error) return job.response;
      job.response = await this.countAllRecords(job);
      if (!!job.response.error) return job.response;
      await this.doAfterRead(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  async update(job: Job): Promise<JobResponse> {
    try {
      await this.doBeforeWrite(job);
      if (!!job.response.error) return job.response;
      job.response = await this.updateRecord(job);
      if (!!job.response.error) return job.response;
      await this.doAfterWrite(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  async delete(job:Job):Promise<JobResponse>{
    try {
      await this.doBeforeDelete(job);
      if (!!job.response.error) return job.response;
      job.response = await this.deleteRecord(job);
      if (!!job.response.error) return job.response;
      await this.doAfterDelete(job);
      return job.response;
    } catch (error) {
      return {error};
    }
  }

  async doAfterRead(job: Job): Promise<void> {
    job.response.error = false;
  }

  async doAfterWrite(job: Job): Promise<void> {
    job.response.error = false;
  }

  async doAfterDelete(job: Job): Promise<void> {
    job.response.error = false;
  }
}
