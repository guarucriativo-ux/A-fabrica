// Escaneia a raiz de guaru_2.0_itsnow por arquivo solto (fora de subpasta) e move pra pasta certa.
// Conservador de propósito: só move o que bate num padrão claro de nome; qualquer coisa ambígua,
// sensível (chave/senha/token/contrato) ou não reconhecida fica parada e é reportada, não movida
// — o objetivo é nunca mover errado um dado financeiro/credencial por engano.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..", "..");
const DRY_RUN = process.argv.includes("--dry-run");

const NEVER_TOUCH = new Set(["CLAUDE.md", "skills-lock.json"]);
const SENSITIVE_PATTERN = /key|senha|password|token|credencial|contrato|cnpj/i;

const RULES = [
  { pattern: /^whatsapp image/i, dest: "Referências" },
  { pattern: /^ref[_-]/i, dest: "Referências" },
  { pattern: /mockup/i, dest: "Mockups" },
  { pattern: /(identidade|logo|marca)/i, dest: "Identidade Visual" },
  { pattern: /(fatura|nota fiscal|invoice|boleto)/i, dest: path.join("Maquina de Marketplaces", "01_Financeiro") },
];

const entries = fs.readdirSync(ROOT, { withFileTypes: true });
const moved = [];
const skipped = [];

for (const entry of entries) {
  if (entry.isDirectory()) continue;
  const name = entry.name;
  if (NEVER_TOUCH.has(name)) continue;

  if (SENSITIVE_PATTERN.test(name)) {
    skipped.push({ name, reason: "possível dado sensível — revisar manualmente" });
    continue;
  }

  const rule = RULES.find((r) => r.pattern.test(name));
  if (!rule) {
    skipped.push({ name, reason: "não classificado" });
    continue;
  }

  const destDir = path.join(ROOT, rule.dest);
  const destPath = path.join(destDir, name);
  if (!DRY_RUN) {
    fs.mkdirSync(destDir, { recursive: true });
    fs.renameSync(path.join(ROOT, name), destPath);
  }
  moved.push({ name, dest: rule.dest });
}

console.log(JSON.stringify({ dryRun: DRY_RUN, moved, skipped }, null, 2));
