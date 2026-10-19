import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const SKILLS = 'C:/Users/lhy/.dsh/skills';
const BACKUP = 'D:/vibe coding/dsh-design-flow/.skill-backups';
const NAMES = [
  'design-taste-frontend',
  'frontend-design',
  'impeccable',
  'make-interfaces-feel-better',
  'taste-skill',
  'ui-ux-pro-max',
  'web-design-guidelines',
];

mkdirSync(BACKUP, { recursive: true });
let done = 0;
for (const name of NAMES) {
  const file = join(SKILLS, name, 'SKILL.md');
  const raw = readFileSync(file, 'utf8');
  if (raw.includes('disable-model-invocation')) {
    console.log(name, 'already flagged, skip');
    continue;
  }
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!m) { console.log(name, 'NO FRONTMATTER, skip'); continue; }
  copyFileSync(file, join(BACKUP, `${name}-SKILL.md.orig`));
  let head = m[1];
  head += '\ndisable-model-invocation: true\nuser-invocable: false';
  const out = raw.replace(m[0], `---\n${head}\n---`);
  writeFileSync(file, out);
  done += 1;
  console.log(name, 'flagged (backup saved)');
}
console.log('flagged', done, 'of', NAMES.length);
