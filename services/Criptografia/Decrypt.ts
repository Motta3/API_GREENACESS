import crypto from "crypto";

const alg = "aes-256-ctr";
const pwd = "abcdefghijklmnopqrstuvwxyzvmmlom";

export default function decrypt(text: string) {
    const parts = text.split(":");
    const decipher = crypto.createDecipheriv(alg, pwd, new Buffer(parts[0], "hex"));
    const plain = decipher.update(text, "hex", "utf8");
    return plain;
}