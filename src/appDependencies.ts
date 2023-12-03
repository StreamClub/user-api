import { DbI } from "@dal/dbConnectionI"
import { MailHandlerI } from "@handlers";

export default interface AppDependencies {
    db: DbI;
    mailHandler: MailHandlerI
}
