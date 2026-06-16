import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "_private-src");
const outDir = path.join(root, "private");

const password = process.env.NOTE_PRIVATE_PASSWORD;
if (!password) {
  console.error(
    "请设置环境变量 NOTE_PRIVATE_PASSWORD，例如：\n" +
      '  PowerShell: $env:NOTE_PRIVATE_PASSWORD="你的密码"; npm run encrypt:private'
  );
  process.exit(1);
}

if (!fs.existsSync(srcDir)) {
  console.error("未找到 _private-src 目录");
  process.exit(1);
}

const files = fs
  .readdirSync(srcDir)
  .filter((f) => f.endsWith(".html"));

if (files.length === 0) {
  console.error("_private-src 中没有 HTML 文件");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  const input = path.join(srcDir, file);
  const staticrypt = path.join(
    root,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "staticrypt.cmd" : "staticrypt"
  );

  console.log(`加密: ${file}`);

  execSync(
    `"${staticrypt}" "${input}" -p "${password.replace(/"/g, '\\"')}" -d "${outDir}" --remember 30`,
    {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, STATICRYPT_PASSWORD: password },
    }
  );
}

console.log(`\n完成！已输出 ${files.length} 个加密文件到 private/`);
