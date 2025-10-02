# Build for production
npm run build:prod

# Deploy to various platforms:

## GitHub Pages
npm install -g angular-cli-ghpages
ng build --configuration production --base-href /nhtsa-vehicle-explorer/
npx angular-cli-ghpages --dir=dist/nhtsa-vehicle-explorer

## Netlify
# Create netlify.toml:
[build]
  command = "npm run build:prod"
  publish = "dist/nhtsa-vehicle-explorer"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

## Vercel
# Install Vercel CLI
npm i -g vercel
vercel --prod

## Firebase
npm install -g firebase-tools
firebase login
firebase init
firebase deploy