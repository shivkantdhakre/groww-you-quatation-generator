# Groww You – Service Quotation Generator

A modern, component-driven, and type-validated React application migrated from a vanilla HTML/CSS/JS implementation. It compiles high-quality service quotations formatted strictly across **exactly two A4 pages** matching corporate brand guidelines, featuring a live 1:1 vector PDF preview.

---

## 🚀 Key Features

* **1:1 Live Vector Preview**: Embedded browser preview utilizing React-PDF's `<PDFViewer>` so what you see on the screen matches the downloaded document exactly.
* **Typing-Optimized Rendering**: Powered by custom hooks `useWatch` and `useDebounce` (500ms delay) to prevent performance lags or freeze frames during active typing.
* **Robust Form Validation**: Uses `react-hook-form` paired with `zod` schema constraints to ensure total milestone payment percentages equal 100% and item limits are enforced.
* **Auto-Save / Persistence**: Seamless state preservation inside `localStorage` via a custom `useLocalStorage` state hook, preserving inputs during reloads.
* **DPI-Clean PDF Generation**: Replaced legacy canvas-snapshot approaches with `@react-pdf/renderer` primitive tags (`<View>`, `<Text>`, `<Image>`, `<Svg>`) to output sharp, selectable vector PDFs.
* **Responsive Styling**: A clean admin control panel powered by Tailwind CSS 4.

---

## 🛠️ Tech Stack

* **Core**: [React 19](https://react.dev/), [Vite 8](https://vite.dev/)
* **CSS Framework**: [Tailwind CSS 4](https://tailwindcss.com/)
* **Form Logic**: [React Hook Form](https://react-hook-form.com/) & [Zod Validation](https://zod.dev/)
* **PDF Compiler**: [@react-pdf/renderer](https://react-pdf.org/)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 File Structure Layout

```text
├── public/                 # Static assets (Favicons, base symbols)
├── src/
│   ├── assets/             # Brand logos & signature image assets
│   ├── components/         # Modular section forms & PDF template
│   │   ├── CompanyInfo.jsx      # Company Details Editor
│   │   ├── ClientInfo.jsx       # Client & Platforms Covered Editor
│   │   ├── ProjectDetails.jsx   # Services Included Editor (enforces list counts)
│   │   ├── PricingSection.jsx   # Currency select & total cost calculation
│   │   ├── PaymentTerms.jsx     # Milestones editor (100% total verification)
│   │   └── QuotationPDF.jsx     # Strict 2-page PDF stylesheet & template
│   ├── data/
│   │   └── defaultTerms.js      # Default configurations & pre-filled list states
│   ├── hooks/
│   │   ├── useDebounce.js       # Input debounce handler for PDF generation
│   │   └── useLocalStorage.js   # Local storage state synchronization hook
│   ├── pages/
│   │   └── QuotationGenerator.jsx  # Primary application layout and state manager
│   ├── utils/
│   │   ├── helpers.js           # Currency formatter utils
│   │   └── imageCompressor.js   # Downscaler for client logo uploads
│   ├── index.css           # Tailwind system directives
│   └── main.jsx            # React root mount and Buffer polyfill
├── package.json            # NPM scripts & dependencies manifest
├── vite.config.js          # Vite configurations (runs on port 8085)
└── tailwind.config.js      # CSS configuration file
```

---

## ⚡ Getting Started

### 1. Install Dependencies
Run the command below in the project directory:
```bash
npm install
```

### 2. Run Local Development Server
Launch the development server on `http://localhost:8085`:
```bash
npm run dev
```

### 3. Production Build
Generate a compiled production bundle into the `dist/` directory:
```bash
npm run build
```

---

## 📜 Layout & Branding Rules
1. **Strict 2-Page Boundary**: Keep deliverables and pricing details reasonably concise so the output compiles cleanly to **exactly two pages** without trailing text lines spilling onto a third page.
2. **Logo Aspect-Ratio Safe**: The header logo renders dynamically using `maxWidth: 220` and `height: 68` to ensure square or landscape layouts remain flush with the left border.
3. **SVG Styling Rules**: Globe/Mail icons are colored in brand orange (`#F5A623`) with contact links positioned to the left of the wave SVG to prevent overlaps.
