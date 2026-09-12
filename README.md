# 🎯 Wardogs Mortar & Artillery Ballistics Calculator

Tactical web application built with **React**, **TypeScript**, and **Tailwind CSS** to calculate exact mortar and artillery range settings and compass bearings in the game **Wardogs**.

Based on SwoleBenji's guide: [How to Accurately Aim & Fire Mortars/Artillery in Wardogs](https://www.youtube.com/watch?v=9X8U-eHCMgI).

---

## ⚡ Features

- **Direct Hit Distance Formula**: Calculates $d = \sqrt{(X_2 - X_1)^2 + (Y_2 - Y_1)^2}$ for immediate first-shot impacts.
- **Compass Bearing**: 360° heading and 16-point cardinal azimuth (N, NE, ESE, etc.) for precise mortar alignment.
- **Weapon Platform Envelope Status**:
  - 🟢 **Mortar Ready**: Within 0 – 700m.
  - 🟡 **Artillery Required**: 701m – 2,630m (heavy vehicle artillery).
  - 🔴 **Out of Range**: Exceeds 2,630m.
- **Interactive Tactical Radar HUD**: Real-time vector plotting with range boundary rings (700m / 2,630m) and zoom controls.
- **Field Manual & Mortar Tips**:
  1. *Mathematical Method*: Pin coordinates and dial direct meters.
  2. *Equipment Comparison*: Early-game light mortar vs. late-game vehicle artillery.
  3. *3-Shell Rapid Bombardment*: Spread coverage technique.
  4. *Grid Estimation*: Fast estimation rules when actively taking fire.
- **Quick Presets & Mission History**: Test scenarios and recall past fire missions with one click.
- **Vercel Ready**: Preconfigured with `vercel.json` and optimized Vite production build.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Run Automated Tests
```bash
node tests/calculator.test.mjs
```

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub / GitLab.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import this repository. Vercel will automatically detect `vite` and set:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. Done!
