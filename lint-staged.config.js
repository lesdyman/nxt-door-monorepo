module.exports = {
  'nxt-app/**/*.{ts,tsx}': () => 'pnpm --filter nxt-app lint',
  'nxt-backend/**/*.ts': () => 'pnpm --filter nxt-backend lint',
}
