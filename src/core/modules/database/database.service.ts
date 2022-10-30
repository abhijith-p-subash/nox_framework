import { NotFoundError } from "../../utils/errors";
import { Job, JobResponse } from "../../utils/job";

export class DataService {
  constructor(private readonly model: any) {}

  async createRecord(job: Job): Promise<JobResponse> {
    try {
      if (!job.body)
        return { error: "Error calling reateRecord: bidy is missing" };
      const fields = job.options?.fields || undefined;
      const include = job.options?.include || undefined;
      const data = await this.model.create(job.body, {
        fields,
        include,
      });
      if (!!include) {
        const dataWithInclude = await this.model.findByPk(data.id, {
          include,
        });
        return { data: dataWithInclude };
      }
      return { data };
    } catch (error) {
      return { error };
    }
  }

  async updateRecord(job: Job): Promise<JobResponse> {
    try {
      if (!job.id)
        return { error: "Error calling updateRecord: id is missing" };
      if (!job.body)
        return { error: "Error calling updateRecord: body is missing" };
      const where = job.options?.where || undefined;
      const data = await this.model.findOne({
        where: { ...where, id: job.id },
      });
      if (data === null) throw new NotFoundError("Record not found");
      const previousData = JSON.parse(JSON.stringify(data));
      for (const prop in job.body) {
        data[prop] = job.body[prop];
      }
      const fields = job.options?.fields || undefined;
      const include = job.options?.include || undefined;
      await data.save({ fields });
      if (!!include) {
        const dataWithInclude = await this.model.findByPk(data.id, {
          include,
        });
        return { data: dataWithInclude, previousData };
      }
      return { data, previousData };
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

  async countAllRecords(job: Job): Promise<JobResponse> {
    try {
      const where = job.options?.where || undefined;
      const attributes = job.options?.attributes || undefined;
      const include = job.options?.include || undefined;
      const distinct = job.options?.distinct || undefined;
      const data = await this.model.count({
        where,
        attributes,
        include,
        distinct,
      });
      return { count: data };
    } catch (error) {
      return { error };
    }
  }

  async findRecordById(job: Job): Promise<JobResponse> {
    try {
      if (!job.id) return { error: "Error Calling FindById: id is missing" };

      const where = job.options?.where || undefined;
      const attributes = job.options?.attributes || undefined;
      const include = job.options?.include || undefined;
      const data = await this.model.findOne({
        where: { ...where },
        attributes,
        include,
      });
      if (data === null) throw new NotFoundError("Record not found");
      return { data };
    } catch (error) {
      return { error };
    }
  }

  async findOneRecord(job: Job): Promise<JobResponse> {
    try {
      if (!job.options?.where)
        return {
          error: "Error Calling findOneRecord: options.where is missing",
        };

      const where = job.options.where || undefined;
      const attributes = job.options.attributes || undefined;
      const include = job.options.include || undefined;
      const order = job.options.sort || undefined;
      const group = job.options.group || undefined;
      const having = job.options.having || undefined;
      const data = await this.model.findOne({
        where,
        attributes,
        include,
        order,
        group,
        having,
      });
      if (data === null) throw new NotFoundError("Record not Found");
      return { data };
    } catch (error) {
      return { error };
    }
  }

  async findAndUpdateRecord(job: Job): Promise<JobResponse> {
    try {
      if (!job.options?.where)
        return {
          error: "Error calling findAndUpdateRecord: options.where is missing",
        };
      if (!job.body)
        return {
          error: "Error calling findAndUpdateRecord: options.body is missing",
        };

      const where = job.options.where || undefined;
      const fields = job.options.fields || undefined;
      const data = await this.model.findOne({
        where,
      });
      if (data === null) throw new NotFoundError("Record not found");
      const previousData = JSON.parse(JSON.stringify(data));
      for (const prop in job.body) {
        data[prop] = job.body[prop];
      }
      await data.save({ fields });
      return { data, previousData };
    } catch (error) {
      return { error };
    }
  }

  async deleteRecord(job: Job): Promise<JobResponse> {
    try {
      if (!job.id)
        return { error: "Error calling deleteRecord: id is missing" };
      const where = job.options?.where;
      const data = await this.model.findOne({
        where: { ...where, id: job.id },
      });
      if (data === null) throw new NotFoundError("Record not found");
      if (!!job.owner && !!job.owner.id) {
        data.updated_by = job.owner.id;
      }
      await this.model.destroy({
        force: !!job.options?.hardDelete,
      });
      return { data };
    } catch (error) {
      return { error };
    }
  }
}
