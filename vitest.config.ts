import { defineConfig } from 'vitest/config';

// Tests target the pure payroll engine under lib/payroll. They import the
// { describe, it, expect } API explicitly (no globals), run in a plain Node
// environment (no DOM), and never touch the network.
export default defineConfig({
  test: {
    include: ['lib/**/*.test.ts'],
    exclude: ['node_modules/**', '.next/**'],
    environment: 'node',
  },
});
