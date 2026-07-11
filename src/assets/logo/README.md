# Mehman G Logo Folder

Welcome to your custom Logo folder!

This folder was created specifically so you can easily change the logo across the entire website.

## How to update your logo:

1. Prepare your logo image file (ideally a transparent `.png` with high resolution, but `.jpg` or `.svg` works too).
2. Save it or rename it to **`logo.png`**.
3. Drag and drop or upload your **`logo.png`** directly into this folder (`/src/assets/logo/`), replacing the existing placeholder.
4. The website will automatically update and use your real logo everywhere (Preloader, Navigation Bar, and Footer)!

## Component Controls:

The logo is managed by the unified `<Logo />` component located at `/src/components/Logo.tsx`.

- **Control Sizes**: You can adjust the size by passing `size="sm"`, `size="md"`, `size="lg"`, etc.
- **Show/Hide Accompanying Text**: If your uploaded image already has "Mehman G" written inside it and you do not want the website to render duplicate text next to it, simply set the `showText` property to `false`:
  ```tsx
  <Logo size="sm" showText={false} />
  ```
