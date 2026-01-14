# Trade-Off Analyzer

Interactive trade-off analysis tool for evaluating different dimensions with
configurable constraints.

## Features

- 🎯 **Global Budget Management**: Allocate points across multiple dimensions
  with a global budget
- ⚔️ **Antithetic Constraints**: Define conflict relationships between
  dimensions
- 🔗 **URL State Persistence**: Share configurations via URL
- 📊 **Interactive Radar Chart**: Visualize trade-offs in real-time
- 🎨 **Modern UI**: Built with Tailwind CSS and Lucide icons

## Development

### Prerequisites

- Node.js 20+
- pnpm 10.15+

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
cd apps/trade-off-analyzer
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
cd apps/trade-off-analyzer
pnpm build
```

### Preview Production Build

```bash
cd apps/trade-off-analyzer
pnpm preview
```

## Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub
Actions.

### Setup GitHub Pages

1. Go to your repository Settings → Pages
2. Under "Build and deployment", select:
   - **Source**: GitHub Actions
3. Push to the `main` branch to trigger deployment

The workflow will automatically:

- Install dependencies
- Build the app
- Deploy to GitHub Pages

Your app will be available at:
`https://<username>.github.io/trade-off-analyzer/`

### Manual Deployment

You can also manually trigger the deployment from the Actions tab in your GitHub
repository.

## Technology Stack

- **Framework**: React 18.3
- **Build Tool**: Vite 7.x
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 3.4
- **Charts**: Recharts 2.x
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Project Structure

```
apps/trade-off-analyzer/
├── public/          # Static assets
├── src/
│   ├── App.tsx      # Main application component
│   ├── main.tsx     # Application entry point
│   └── index.css    # Global styles
├── index.html       # HTML entry point
├── vite.config.ts   # Vite configuration
├── tsconfig.json    # TypeScript configuration
└── package.json     # Dependencies and scripts
```

## License

See [LICENSE](../../LICENSE) file in the repository root.
