#!/usr/bin/env node
/**
 * Custom Setup Script for Arc-i-Tech Frontend
 * Automatically installs dependencies, sets up Tailwind, and runs dev server.
 */
import { execSync } from "child_process";
import fs from "fs";

console.log("🚀 Starting Arc-i-Tech Frontend Setup...\n");

function run(command) {
  console.log(`👉 Running: ${command}`);
  execSync(command, { stdio: "inherit" });
}

try {
  // Step 1: Clean previous installs
  if (fs.existsSync("node_modules")) {
    console.log("🧹 Removing existing node_modules...");
    fs.rmSync("node_modules", { recursive: true, force: true });
  }
  if (fs.existsSync("package-lock.json")) {
    fs.rmSync("package-lock.json");
  }

  // Step 2: Install dependencies
  run("npm install");

  // Step 3: Install Tailwind + PostCSS + Autoprefixer
  run("npm install -D tailwindcss postcss autoprefixer");

  // Step 4: Initialize Tailwind configs if not exist
  if (!fs.existsSync("tailwind.config.js")) {
    console.log("🧩 Creating Tailwind config files...");
    run("npx tailwindcss init -p");
  }

  // Step 5: Update Tailwind config for Angular/Next.js
  const configPath = "./tailwind.config.js";
  if (fs.existsSync(configPath)) {
    let config = fs.readFileSync(configPath, "utf8");
    if (!config.includes("content:")) {
      config = config.replace(
        "theme: {",
        `content: ["./src/**/*.{html,ts,tsx,js,jsx}"],\n  theme: {`
      );
      fs.writeFileSync(configPath, config);
    }
  }

  // Step 6: Add Tailwind directives in styles.css
  const stylesFile = fs.existsSync("src/styles.css")
    ? "src/styles.css"
    : "src/app/globals.css";

  if (fs.existsSync(stylesFile)) {
    let styles = fs.readFileSync(stylesFile, "utf8");
    if (!styles.includes("@tailwind base")) {
      styles = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${styles}`;
      fs.writeFileSync(stylesFile, styles);
    }
  }

  console.log("✅ Tailwind successfully configured!");
  console.log("🎨 Ready to start your app!");

  // Step 7: Start development server
  run("npm run dev");

  console.log("\n✅ Arc-i-Tech Frontend Setup Complete!");
} catch (error) {
  console.error("❌ Setup failed:", error.message);
  process.exit(1);
}
