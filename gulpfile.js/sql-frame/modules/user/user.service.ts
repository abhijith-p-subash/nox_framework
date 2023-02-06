import { ModelService } from "../../../core/modules/database/model.service";
import { ValidationError } from "../../../core/utils/errors";
import { Job } from "../../../core/utils/job";

export class UserService extends ModelService {
  constructor(userModel: any) {
    super(userModel);
  }

  async doBeforeWrite(job: Job): Promise<void> {
    await super.doBeforeWrite(job);

    if (job.action === "action") {
      delete job?.body?.email;
      delete job?.body?.password;
    }

    if (job.action === "create") {
      const { error, data } = await this.findOneRecord(
        new Job({
          action: "findOneRecord",
          options: {
            where: { email: job?.body?.email },
            allowEmpty: true,
          },
        })
      );
      if (!!error) {
        job.response = { error };
      } else if (!!data) {
        job.response = { error: new ValidationError("Email is already exist") };
      }
    }
  }

  // async doAfterWrite(job: Job): Promise<void> {
  //   await super.doAfterWrite(job);
  //   job.response.data.password = undefined;
  // }
}
