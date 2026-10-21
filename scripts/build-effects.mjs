import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';

await build({
  entryPoints: ['src/effects.js'],
  outfile: 'public/effects.js',
  bundle: true,
  minify: true,
  format: 'esm',
  target: ['es2022'],
  legalComments: 'eof',
});

// Retain the MIT notices for the bundled Motion dependency chain.
const packages = ['motion', 'framer-motion', 'motion-dom', 'motion-utils'];
writeFileSync('public/assets/Motion-LICENSE.txt', packages.map(name => {
  const pkg = JSON.parse(readFileSync(`node_modules/${name}/package.json`, 'utf8'));
  return `${name} ${pkg.version}\n${'='.repeat(60)}\n${readFileSync(`node_modules/${name}/LICENSE.md`, 'utf8')}`;
}).join('\n\n'));
