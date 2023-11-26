import { MAX_VALIDATION_CODE, MIN_VALIDATION_CODE } from "@config";

export function generate6digitNumber() {
    const min = MIN_VALIDATION_CODE;
    const max = MAX_VALIDATION_CODE;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
