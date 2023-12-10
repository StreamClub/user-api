import { Db } from "@dal";
import { MailHandlerI } from "@handlers";

export default interface AppDependencies {
    db: Db;
    mailHandler: MailHandlerI
}
