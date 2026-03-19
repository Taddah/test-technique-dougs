# TestTechniqueDougs

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Notes on server communication

The project supports two interoperability modes with the Node.js backend (port 3001):

### Mode A : Vite Proxy 

Avoids any backend modifications. It intercepts `/api` calls and redirects them to port 3001.
**Config** : proxy.conf.json (target: http://127.0.0.1:3001 or http://localhost ou IP locale).
Execution: 
```bash
npm run start-with-proxy
```
  
### Mode B : Direct (Fallback)
Direct calls to port 3001. Requires `cors()` to be enabled on the Node.js side.

**Config**: Update the factory in `src/app/core/tokens/category-api-url.token.ts` to `http://localhost:3001`

Execution: 
```bash
npm run start
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Code Formatting and Linting

We enforce code quality through ESLint and Prettier.

To lint the project (check for code issues without fixing them):

```bash
npm run lint
```

To automatically fix fixable issues:

```bash
npm run lint:fix
```

To format code files according to Prettier rules:

```bash
npm run format
```

To only check if files are formatted correctly (useful in CI):

```bash
npm run format:check
```

## Git Hooks & Husky

This project leverages [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged) to ensure commits are clean:

- **Pre-commit**: Automatically runs Prettier and ESLint on all staged files (`*.js, *.ts, *.html, *.scss`) before committing.
- **Commit-msg**: Ensures commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification using Commitlint.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
