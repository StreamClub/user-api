import schedule from "node-schedule";
import pinoLogger from "pino";
import { tokenService } from "@services";
import { config } from "@config";

class CronjobService {
    private logger: any;
    public start() {
        this.logger = pinoLogger();
        this.deleteExpiredVerificationCodes();
    }

    public async deleteExpiredVerificationCodes() {
        schedule.scheduleJob(config.validationCodeCronExpression, async () => {
            try {
                tokenService.deleteExpiredVerificationCodes();
            } catch (error: any) {
                this.logger.error(error.message);
            }
        });
    }

    public async stop() {
        schedule.cancelJob(config.validationCodeCronExpression);
    }
}
export const cronjobService = new CronjobService();
