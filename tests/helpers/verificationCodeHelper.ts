import { verificationCodeRepository } from "@dal";
import { VerificationCode } from "@entities";
import { generate6digitNumber } from "@utils";


export async function saveTestVerificationCode(email: string): Promise<number> {
    const verificationCode = generate6digitNumber();
    await verificationCodeRepository.save(new VerificationCode({ email, verificationCode }));
    return verificationCode;
}
