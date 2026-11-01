import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
export default [{ ignores: ["legacy/**", "ai-api/**", ".next/**", "next-env.d.ts", "*.mjs"] }, ...compat.extends("next/core-web-vitals", "next/typescript")];
