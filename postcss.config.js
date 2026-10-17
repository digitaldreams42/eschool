/**
 * Next.js only discovers `postcss.config.js` / `.cjs` / `.postcssrc.*`
 * (see next/dist/lib/find-config.js). A `postcss.config.mjs` is silently
 * ignored — which is why Tailwind was never compiled in this project.
 *
 * Keep this file CommonJS. package.json has no "type": "module".
 *
 * @type {import('postcss-load-config').Config}
 */
const config = {
  plugins: {
    tailwindcss: {},
  },
}

module.exports = config
