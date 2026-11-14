# Project agent tooling

This project keeps its Codex configuration in `.codex/config.toml` and its project skills in `.agents/skills/`.

- OpenSpec is pinned in `package.json` and initialized under `openspec/`. Run `npm run openspec -- --help`; use `$openspec-propose` to plan a change before implementation.
- Ponytail 5.3.3 skills are vendored under `.agents/skills/` and the Codex plugin is enabled through `.codex/config.toml`.
- Use the configured read-only subagent roles for independent exploration, code review, security review, and test review. They should report findings and never edit the repository.
- The Java backend is a separate sibling checkout at `../barbershop-app-backend-java`.

Sources:

- OpenSpec source: https://github.com/sohsaws/OpenSpec (the published `@fission-ai/openspec@1.16.1` package is the same release).
- Ponytail source: https://github.com/sohsaws/ponytail (the vendored 5.3.3 skills match the requested repository).
- Codex example: https://github.com/sohsaws/web-app
