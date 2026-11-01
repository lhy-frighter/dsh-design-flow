#!/usr/bin/env node
// Generate a self-contained, host-neutral skill from the maintained plugin skills.
import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (process.argv.includes('--help')) {
  process.stdout.write('Usage: node scripts/export-portable.mjs [destination-directory]\nDefault: portable/ui-design-flow\n');
  process.exit(0);
}
const destination = path.resolve(process.argv[2] ?? path.join(root, 'portable', 'ui-design-flow'));
const source = path.join(root, 'skills', 'design-flow');
const references = [
  'agent-portability.md', 'art-direction.md', 'inspiration-matrix.md',
  'reference-engineering.md', 'reviewer-manual.md', 'sources.md', 'templates.md',
  'hallmark-adapter.md', 'technology-routing.md', 'motion-catalog.md', 'routing-examples.md',
  'technology-extensions.md', 'asset-and-performance.md',
];
const files = new Map();
let entry = await readFile(path.join(source, 'SKILL.md'), 'utf8');
const workflowVersion = /^  version: ["']?([0-9]+\.[0-9]+\.[0-9]+)["']?$/m.exec(entry)?.[1];
if (!workflowVersion) throw new Error('Missing workflow metadata version');
entry = entry.replace(/^name: design-flow$/m, 'name: ui-design-flow')
  .replace('[grill-me](../grill-me/SKILL.md)', '[grill-me](references/grill-me.md)')
  .replace('若宿主只能加载单个目录，使用便携版 ui-design-flow；临时无法读取时按阶段 0.6 的协议继续。', '本目录已包含访谈协议与题库；临时无法读取时按阶段 0.6 的协议继续。')
  .replaceAll('按同级 grill-me 执行', '按内置 grill-me 访谈协议执行')
  .replace('# Design Flow\n', '# UI Design Flow（便携版）\n');
files.set('SKILL.md', entry);
for (const ref of references) files.set(`references/${ref}`, await readFile(path.join(source, 'references', ref), 'utf8'));
const interview = await readFile(path.join(root, 'skills', 'grill-me', 'SKILL.md'), 'utf8');
files.set('references/grill-me.md', interview.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
  .replaceAll('(references/question-bank.md)', '(question-bank.md)'));
files.set('references/question-bank.md', await readFile(path.join(root, 'skills', 'grill-me', 'references', 'question-bank.md'), 'utf8'));
files.set('LICENSE', await readFile(path.join(root, 'LICENSE'), 'utf8'));
files.set('README.md', `# ui-design-flow 便携版

自包含的 UI 设计/重设计技能（流程 v${workflowVersion}），包含深度访谈、问题题库、艺术方向、实现与评审资料。

把整个 ui-design-flow 文件夹复制到宿主支持的 skills 目录，保留 SKILL.md、references/ 和 LICENSE。
例如项目的 .agents/skills/ui-design-flow/；具体发现路径以该 agent 的配置为准。
支持显式技能调用的宿主可输入 $ui-design-flow，或明确要求读取此目录的 SKILL.md。

示例：「用 ui-design-flow 改进这个应用。先深入澄清核心任务和我说的高级感，再做两个真实内容的方向对比，最后实现并验证。」

不需要 DSH、特定模型或额外设计技能。oil_ui_* 只是 DSH 可选能力示例，其他 agent 按能力映射继续；无浏览器/看图工具时明确未完成的验证。
不包含 DSH 工具实现、React 规则集或品牌离线库。完整目录可离线读取；外部链接是可选参考。

维护方式：在源仓库修改 skills/design-flow 与 skills/grill-me，运行 node scripts/export-portable.mjs；避免手改生成的副本。
manifest.json 记录生成文件的 SHA-256，用于核验跨目录/压缩包传输是否完整。

License: MIT。研究来源与采用边界见 references/sources.md。
`);

// Every Markdown resource link must resolve inside this portable artifact.
for (const [relative, content] of files) {
  if (!relative.endsWith('.md')) continue;
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^(?:[a-z][a-z0-9+.-]*:|\/)/i.test(target)) continue;
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(relative), target));
    if (!files.has(resolved)) throw new Error(`Unresolved portable resource: ${relative} -> ${target}`);
  }
}
const hashes = [];
for (const [relative, content] of files) {
  const filename = path.join(destination, relative);
  await mkdir(path.dirname(filename), { recursive: true });
  try {
    if (!(await stat(filename)).isFile()) throw new Error(`Not a file: ${filename}`);
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await writeFile(filename, content, 'utf8');
  hashes.push({ path: relative, sha256: createHash('sha256').update(content).digest('hex') });
}
await writeFile(path.join(destination, 'manifest.json'), JSON.stringify({
  name: 'ui-design-flow', version: workflowVersion, files: hashes,
}, null, 2) + '\n', 'utf8');
process.stdout.write(`Exported ${hashes.length} files plus manifest to ${destination}; all Markdown resource links resolve.\n`);
