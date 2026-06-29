# TasteSkill

Anti-slop design skills for [Hermes Agent](https://github.com/NousResearch/hermes-agent) and AI coding tools.

Seven skill variants that enforce design quality in AI-generated UI code. Each targets a different concern — from spacing and typography fundamentals to GSAP animation budgets to image prompt structure. Zero external dependencies.

## Skills

| Skill | What it does |
|-------|-------------|
| **default** | Core anti-slop rules: spacing scale, type hierarchy, color restraint, contrast checks |
| **soft-calm** | Muted, warm, whitespace-heavy aesthetic for premium/luxury interfaces |
| **editorial** | Magazine-style typographic hierarchy with strict grid and restraint |
| **strict-gsap** | GSAP animation constraints, easing rules, and motion budgets |
| **redesign** | Audit-then-improve workflow for upgrading existing UI code |
| **complete-output** | Forces complete files with zero placeholder comments or truncated code |
| **image-gen** | Art direction rules for AI image generation prompts |

## How it works

Each skill is a `SKILL.md` file that gets loaded into your AI agent's context. The file contains design rules, anti-patterns to avoid, and a verification checklist the agent runs before presenting output. No dependencies, no build step — just markdown that makes AI output better.

## Website

[tasteskill.qzz.io](http://tasteskill.qzz.io)

## License

MIT
READMEEOF

## Install

```bash
npx taste-skill init
