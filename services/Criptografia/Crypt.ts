import crypto from "crypto"

const alg = "aes-256-ctr";
const pwd = "abcdefghijklmnopqrstuvwxyzvmmlom";

export default function crypt(text: string) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createDecipheriv(alg, pwd, iv);
    const crypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
    return iv.toString("hex") + ":" + crypted;
}