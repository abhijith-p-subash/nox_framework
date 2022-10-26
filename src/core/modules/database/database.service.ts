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
      const offset = job.options?.offset ? +job.options.offset : 0;
      const limit = job.options?.limit
        ? +job.options.limit === -1
          ? 1000
          : +job.options.limit
        : 10;
      const where = job.options?.where || undefined;
      const attributes = job.options?.attributes || undefined;
      const include = job.options?.include || undefined;
      const order = job.options?.sort || undefined;
      const group = job.options?.group || undefined;
      const having = job.options?.having || undefined;

      const data = await this.model.findAndCountAll({
        offset,
        limit,
        where,
        attributes,
        include,
        order,
        group,
        having,
      });
      return { data: data.rows, offset, limit, count: data.count };
    } catch (error) {
      return { error };
    }
  }
}
