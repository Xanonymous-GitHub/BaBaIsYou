# Contributing

Please open pull requests for new ideas and bug fixes, or contact us at trusaidlin@gmail.com.

Since there are still a lot of bugs in this project, if you can give us good suggestions, we will be very grateful to you ~

Hope you enjoy this game, thank you.

## Before opening a pull request

1. Install the Node.js and Bun versions listed in [README.md](README.md#development).
2. Run `bun install --frozen-lockfile` and `bun x playwright install chromium` (add `--with-deps` on Linux).
3. Make your changes. Add or update browser regression tests in `tests/` when changing gameplay or navigation.
4. Run `bun run check`. This must pass lint, TypeScript/Vue type-checking, the production build, the Cloudflare deployment dry-run, and browser tests before review.

Use `bun run lint:fix` for automatic lint fixes. Keep the existing code style and avoid unrelated formatting changes. If dependencies change, use `bun install` and include the updated `bun.lock`; do not add npm, Yarn, or pnpm lockfiles.

CI checks pull requests and pushes to `main`. Do not replace the TypeScript compatibility aliases with a direct TypeScript 7 dependency: typescript-eslint and `vue-tsc` still require the TypeScript 6 compiler API.
