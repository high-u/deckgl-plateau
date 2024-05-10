# Check deck.gl behavior by version

## How to change versions

```bash
npm uninstall deck.gl
rm -rf node_modules
npm cache clean --force
npm install

# `npm install deck.gl@8.9.35` or `npm install deck.gl@^9.0.0`
npm install deck.gl@8.9.35

npm list --depth=0
```

```bash
npm run dev
```
