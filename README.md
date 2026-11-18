# Nuxt 4 Minimal Starter for English Football Demo Application

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

Included at: app/assets/css/a11y.css is a CSS file that visually highlights common accessibility (A11Y) problems in the HTML (missing lang, images without alt, empty buttons/links, invalid hrefs, etc.). This will only run in development and any accessibility issues on the page will be highlighted:

Images missing alt → blurred
Empty <a> or <button> → red dotted border
Invalid links (href="#" or missing) → red outline
<html> without lang → red border

## Unit Testing

npm i -D @nuxt/test-utils vitest @vue/test-utils happy-dom

```bash
# npm
npm run test:unit
```

## Project Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview

```
