import schedule from "node-schedule";
import { tokenService } from "@services";
import { config } from "@config";
import { logger } from "@utils";

class CronjobService {
    public start() {
        this.deleteExpiredVerificationCodes();
    }

    public async deleteExpiredVerificationCodes() {
        schedule.scheduleJob(config.validationCodeCronExpression, async () => {
            try {
                tokenService.deleteExpiredVerificationCodes();
            } catch (error: any) {
                logger.error(error.message);
            }
        });
    }

    public async stop() {
        schedule.cancelJob(config.validationCodeCronExpression);
    }
}
export const cronjobService = new CronjobService();
