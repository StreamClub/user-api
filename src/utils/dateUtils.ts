import { VALIDATION_CODE_LIFE_UNIT, config } from "@config";
import moment from "moment";

export function isCodeValid(creationTime: Date): Boolean {
    return moment(creationTime).add(config.verificationCodeLifeMinutes, VALIDATION_CODE_LIFE_UNIT).isAfter(moment());
}
