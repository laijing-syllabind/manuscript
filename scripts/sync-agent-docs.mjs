#!/usr/bin/env node
/**
 * Propagates shared agent instructions from CLAUDE.md → AGENTS.md + Cursor rule.
 * CLAUDE.md is the source of truth for shared body content.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const claudePath = join(root, 'CLAUDE.md');
const agentsPath = join(root, 'AGENTS.md');
const ruleDir = join(root, '.cursor/rules');
const rulePath = join(ruleDir, 'manuscript-agent-guide.mdc');

const BODY_MARKER = '## Design system docs are a mirror of the code — keep them in sync';

const claude = readFileSync(claudePath, 'utf8');
const markerIndex = claude.indexOf(BODY_MARKER);
if (markerIndex === -1) {
  console.error(`Could not find shared body in CLAUDE.md (expected "${BODY_MARKER}")`);
  process.exit(1);
}

const body = claude.slice(markerIndex);

const claudeHeader = `# Manuscript — agent guide

> **🔄 Maintenance Notice:** Source of truth for project agent instructions. \`AGENTS.md\` (Cursor/Composer) and \`.cursor/rules/manuscript-agent-guide.mdc\` are generated from this file. After editing shared content below, run \`npm run sync:agent-docs\`.

`;

const agentsHeader = `# Manuscript — agent guide

This file provides guidance to Cursor, Composer, and other AI coding assistants when working in this repository.

> **🔄 Maintenance Notice:** Generated from \`CLAUDE.md\`. Do not edit shared content here directly — update \`CLAUDE.md\` and run \`npm run sync:agent-docs\`.
>
> **AI Initiation Protocol:** On first message in a session, if \`AGENTS.md\`, \`CLAUDE.md\`, or \`.cursor/rules/manuscript-agent-guide.mdc\` differ in shared content, reconcile immediately before substantive work.

`;

const ruleHeader = `---
description: Manuscript agent guide — design system doc sync and repo orientation
alwaysApply: true
---

> **🔄 Maintenance Notice:** Generated from \`CLAUDE.md\`. Do not edit shared content here directly — update \`CLAUDE.md\` and run \`npm run sync:agent-docs\`.

`;

const beforeBody = claude.slice(0, markerIndex);
if (!beforeBody.includes('Maintenance Notice')) {
  writeFileSync(claudePath, claudeHeader + body);
}

mkdirSync(ruleDir, { recursive: true });
writeFileSync(agentsPath, agentsHeader + body);
writeFileSync(rulePath, ruleHeader + body);

console.log('Synced AGENTS.md and .cursor/rules/manuscript-agent-guide.mdc from CLAUDE.md');
