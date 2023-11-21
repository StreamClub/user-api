import moment from "moment";

export function isCodeValid(creationTime: Date): Boolean {
    return moment(creationTime).add(1, 'minutes').isAfter(moment());
}
