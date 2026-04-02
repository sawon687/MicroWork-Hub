import bcrypt from "bcryptjs";
export  async function isMatchAndPassCheck(user, password) {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
}

export async function passwordConvertBycrpt(password){
    const passwordHash=await bcrypt.hash(password,10)
    return passwordHash
}