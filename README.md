# Repo zum React Powerkurs

## Hilfreiche Infos, Links und Suchwörter

- [Medium: Including React in your Spring Boot Maven Build](https://medium.com/@itzgeoff/including-react-in-your-spring-boot-maven-build-ae3b8f8826e)

- Einige Alternativen zu [NPM](https://www.npmjs.com/) (Paketmanager und Paketquelle / Registry) und [Node.js](https://nodejs.org/en) (Laufzeitumgebung)
  - [yarn](https://yarnpkg.com/) - Paketmanager
  - [pnpm](https://pnpm.io/) - Paketmanager
  - [Bun](https://bun.sh/) - Laufzeitumgebung, Paketmanager, Testausführung, Bundler
  - [Deno](https://deno.com/) - Analog zu Bun
  - [jsr](https://jsr.io/) - Paketquelle / Registry

- Linting und Formatierung
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [Biome](https://biomejs.dev/)

- Hinweis: Bei der Verarbeitung von Ganzzahlen (bspw. IDs) größer als 2^53 – 1 ([MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)), bietet sich z.B. die Verwendung von [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) bzw. string an, je nach Anwendungsfall. Das liegt daran, dass in JavaScript [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) eine 64-bit Fließkommazahl ist.

- Beispiele für Full-Stack-Frameworks, die man mit React verwenden kann:
  - [Next.js](https://nextjs.org/)
  - [Remix](https://remix.run/)
  - [TanStack Start](https://tanstack.com/start)

- TypeScript Cheat Sheets
  - <https://www.typescriptlang.org/cheatsheets/>
  - <https://react-typescript-cheatsheet.netlify.app/>

- [Setzen des Seitentitels in React per `title`](https://react.dev/reference/react-dom/components/title)

- React Router
  - <https://reactrouter.com/home>
  - <https://reactrouter.com/start/declarative/installation>

- Styling mit [TailwindCSS](https://tailwindcss.com/)
  - <https://tailwindcss.com/docs/installation/using-vite>

- [CSS transform: rotate](https://developer.mozilla.org/de/docs/Web/CSS/Reference/Values/transform-function/rotate)

- Headless UI: [Radix Primitives](https://www.radix-ui.com/primitives)

- <https://ui.shadcn.com/>
- <https://lucide.dev/>
- <https://react-icons.github.io/react-icons/>
- <https://www.radix-ui.com/icons>

- Datenvalidierung mit Zod: <https://zod.dev/>

- [Reddit: TypeScript bounded number range](https://www.reddit.com/r/typescript/comments/1750y8j/comment/n5r8ff9/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness>
- <https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt>
