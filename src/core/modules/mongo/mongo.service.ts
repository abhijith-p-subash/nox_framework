import { isEmptyObject } from "./../../utils/validation";
import { NotFoundError } from "../../utils/errors";
import { Job, JobResponse } from "../../utils/job";

export class MongoService {
  constructor(private readonly model: any) {}

  async createRecord(job: Job): Promise<JobResponse> {
    try {
      if (isEmptyObject(job.body))
        return { error: "Error calling reateRecord: body is missing" };
      const data = await this.model.create(job.body);
      return { data };
    } catch (error) {
      return { error };
    }
  }

  async updateRecord(job: Job): Promise<JobResponse> {
    try {
      if (!job.id)
        return { error: "Error calling updateRecord: id is missing" };
      if (isEmptyObject(job.body))
        return { error: "Error calling updateRecord: body is missing" };
      const where = job.options?.where || {};
      const populate = job.options?.populate || "";
      let data = await this.model.findOne({
        ...where,
        _id: job.id,
        deleted_at: null,
      });
      if (data === null) throw new NotFoundError("Record not found");
      const previousData = JSON.parse(JSON.stringify(data));
      for (const prop in job.body) {
        data[prop] = job.body[prop];
      }
      const fields = job.options?.fields || undefined;
      const include = job.options?.include || undefined;
      await data.save({ fields });
      if (!!populate) {
        data = await data.populate(populate).execPopulate();
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
      const where = job.options?.where || {};
      const projection = job.options?.attributes || undefined;
      const populate: any = job.options?.populate || "";
      const sort = job.options?.sort || [];

      const data = await Promise.all([
        this.model.find(where, projection, {
          skip: offset,
          limit,
          populate,
          sort,
        }),
        this.model.countDocuments(where),
      ]);
      console.log("MOGO SERVICE");

      console.log(data);

      return { data: data[0], offset, limit, count: data[1] };
    } catch (error) {
      return { error };
    }
  }

  async countAllRecords(job: Job): Promise<JobResponse> {
    try {
      const where = job.options?.where || {};

      if (!job.options?.withDeleted) {
        where.deleted_at = null;
      }
      const data = await this.model.countDocuments({
        where
      });
      return { count: data };
    } catch (error) {
      return { error };
    }
  }

  async findRecordById(job: Job): Promise<JobResponse> {
    try {
      if (!job.id) return { error: "Error Calling FindById: id is missing" };
      const where = job.options?.where || {};
      const projection = job.options?.attributes || undefined;
      const populate: any = job.options?.populate || "";
      if (!job.options?.withDeleted) {
        where.deleted_at = null;
      }
      const data = await this.model.findOne(
        { ...where, _id: job.id },
        projection,
        {
          populate,
        }
      );
      if (data === null && !job.options?.allowEmpty)
        throw new NotFoundError("Record not found");
      return { data };
    } catch (error) {
      return { error };
    }
  }

  async findOneRecord(job: Job): Promise<JobResponse> {
    try {
      console.log(job);

      if (!job.options?.where)
        return {
          error: "Error Calling findOneRecord: options.where is missing",
        };
      const offset = job.options.offset ? +job.options.offset : 0;
      const where = job.options.where || undefined;
      const projection = job.options.attributes || undefined;
      const populate: any = job.options.populate || "";
      const sort = job.options.sort || [];
      if (!job.options.withDeleted) {
        where.deleted_at = null;
      }
      const data = await this.model.findOne(where, projection, {
        populate,
        skip: offset,
        sort,
      });
      if (data === null && !job.options.allowEmpty)
        throw new NotFoundError("Record not Found");
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
      if (!job.options?.withDeleted) {
        where.deleted_at = null;
      }
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
      const where = job.options?.where || {};
      if (!job.options?.hardDelete) {
        where.deleted_at = null;
      }
      const data = await this.model.findOne({
        where: { ...where, _id: job.id },
      });
      if (data === null) throw new NotFoundError("Record not found");
      if (!!job.options?.hardDelete) {
        await data.remove();
      } else {
        if (!!job.owner && !!job.owner.id) {
          data.updated_by = job.owner.id;
        }
        data.deleted_at = Date.now();
        await data.save();
      }
      return { data };
    } catch (error) {
      return { error };
    }
  }
}
