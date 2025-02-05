import {hash} from "bcryptjs";

export const createPassword = async (password: string) => {
    return await hash(password, 10)
}