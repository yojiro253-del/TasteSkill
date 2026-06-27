#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SKILLS = [
  'default',
  'soft-calm',
  'editorial',
  'strict-gsap',
  'redesign',
  'complete-output',
  'image-gen',
];

const USAGE = `
taste-skill — Anti-slop design skills for Hermes Agent

Usage:
  npx taste-skill init                  Install all skills + templates into your project
  npx taste-skill init --skills-only    Install only Hermes SKILL.md files
  npx taste-skill init --templates-only Install only .txt prompt templates
  npx taste-skill list                  List available skills

Skills are copied to:
  skills/taste/         Hermes-compatible SKILL.md files
  templates/taste/      Plain .txt prompts for non-Hermes users
`;

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function init(flags) {
  const cwd = process.cwd();
  const pkgRoot = path.resolve(__dirname, '..');
  const skillsSrc = path.join(pkgRoot, 'skills', 'taste');
  const templatesSrc = path.join(pkgRoot, 'templates');

  let copiedSkills = 0;
  let copiedTemplates = 0;

  if (!flags.templatesOnly) {
    const skillsDest = path.join(cwd, 'skills', 'taste');
    console.log(`\nCopying skills → ${path.relative(cwd, skillsDest)}/`);

    for (const skill of SKILLS) {
      const src = path.join(skillsSrc, skill);
      const dest = path.join(skillsDest, skill);

      if (!fs.existsSync(src)) {
        console.log(`  ⚠ Missing source: ${skill}/SKILL.md`);
        continue;
      }

      copyDirRecursive(src, dest);
      copiedSkills++;
      console.log(`  ✓ ${skill}/SKILL.md`);
    }
  }

  if (!flags.skillsOnly) {
    const templatesDest = path.join(cwd, 'templates', 'taste');
    console.log(`\nCopying templates → ${path.relative(cwd, templatesDest)}/`);

    for (const entry of fs.readdirSync(templatesSrc)) {
      if (!entry.endsWith('.txt')) continue;
      const src = path.join(templatesSrc, entry);
      const dest = path.join(templatesDest, entry);

      if (!fs.existsSync(templatesDest)) {
        fs.mkdirSync(templatesDest, { recursive: true });
      }

      fs.copyFileSync(src, dest);
      copiedTemplates++;
      console.log(`  ✓ ${entry}`);
    }
  }

  console.log(`\nDone. ${copiedSkills} skills, ${copiedTemplates} templates installed.`);

  if (copiedSkills > 0) {
    console.log('\nHermes users: skills are ready. Run `hermes` and they will auto-load from skills/taste/.');
  }
  if (copiedTemplates > 0) {
    console.log('Non-Hermes users: paste the .txt contents into your system prompt or project rules.');
  }

  console.log('');
}

function list() {
  console.log('\nAvailable TasteSkill variants:\n');
  console.log('  Skill              Format    Description');
  console.log('  ─────              ──────    ───────────');

  const descriptions = {
    'default':         'Core anti-slop design rules for UI output.',
    'soft-calm':       'Muted, warm, whitespace-heavy aesthetic.',
    'editorial':       'Magazine-style typographic hierarchy.',
    'strict-gsap':     'GSAP animation constraints and easing rules.',
    'redesign':        'Audit-then-improve workflow for existing UI.',
    'complete-output': 'Forces complete files, zero placeholders.',
    'image-gen':       'Art direction for AI image prompts.',
  };

  for (const skill of SKILLS) {
    const name = skill.padEnd(18);
    console.log(`  ${name}  SKILL.md  ${descriptions[skill]}`);
    console.log(`  ${''.padEnd(18)}  .txt      Plain-text prompt template`);
  }

  console.log('');
}

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  console.log(USAGE);
  process.exit(0);
}

if (command === 'list') {
  list();
  process.exit(0);
}

if (command === 'init') {
  const flags = {
    skillsOnly: args.includes('--skills-only'),
    templatesOnly: args.includes('--templates-only'),
  };
  init(flags);
  process.exit(0);
}

console.error(`Unknown command: ${command}\n`);
console.log(USAGE);
process.exit(1);
