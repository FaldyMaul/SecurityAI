# AISandboxDev - Development & Deployment Guide

This directory contains the core development artifacts for the **AI Sandbox** project, ranging from planning to the initial frontend implementation.

## 📂 Directory Structure

- **[01_Planning](./01_Planning)**: Project charters, execution roadmaps, and strategic planning documents.
- **[02_Product_UI](./02_Product_UI)**: UI/UX design assets, Figma references, and product interface documentation.
- **[03_Frontend](./03_Frontend)**: The implementation of the AI Sandbox Frontend (v0.1) built with Next.js.
- **[03_QA_Docs](./03_QA_Docs)**: Quality Assurance protocols, test cases, and verification documentation.

---

## 🚀 Frontend Getting Started (v0.1)

The frontend is located in the `03_Frontend` directory.

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
Navigate to the frontend directory:
```bash
cd AISandboxDev/03_Frontend
```

Install dependencies:
```bash
npm install
```

### Development
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build
To create an optimized production build:
```bash
npm run build
```

---

## 🔗 GitHub Deployment Information

- **Repository**: `https://github.com/FaldyMaul/SecurityAI.git`
- **Main Branch**: `main` (Core documentation & shared resources)
- **Feature Branch**: `v0.1` (Current development branch containing this folder)

### Pushing Updates
To push updates to the `v0.1` branch:
1. Ensure you are on the `v0.1` branch:
   ```bash
   git checkout v0.1
   ```
2. Add your changes:
   ```bash
   git add AISandboxDev/
   ```
3. Commit and Push:
   ```bash
   git commit -m "docs: update AISandboxDev documentation"
   git push origin v0.1
   ```

---
*Last updated: 2026-03-10*
