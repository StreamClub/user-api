import schedule from "node-schedule";
import pinoLogger from "pino";
import { authService } from "@services";

class CronjobService {
    private logger: any;
    public start() {
        this.logger = pinoLogger();
        this.deleteExpiredVerificationCodes();
    }

    public async deleteExpiredVerificationCodes() {
        schedule.scheduleJob("*/5 * * * *", async () => {
            try {
                authService.deleteExpiredVerificationCodes();
            } catch (error: any) {
                this.logger.error(error.message);
            }
        });
    }
}
export const cronjobService = new CronjobService();
