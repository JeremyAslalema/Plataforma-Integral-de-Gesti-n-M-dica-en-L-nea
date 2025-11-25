This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


plataforma-medica/
├── 📁 .next/                         # Build de Next.js
├── 📁 app/                           # Next.js App Router
│   ├── 📁 api/
│   │   └── 📁 auth/
│   │       ├── 📁 [...nextauth]/
│   │       │   └── 📄 route.ts
│   │       └── 📁 register/
│   │           └── 📄 route.ts
│   ├── 📁 auth/
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 register/
│   │   │   └── 📄 page.tsx
│   │   └── 📄 layout.tsx
│   ├── 📁 components/
│   │   ├── 📁 forms/
│   │   │   ├── 📄 login-form.tsx
│   │   │   └── 📄 register-form.tsx
│   │   ├── 📁 layout/
│   │   │   ├── 📄 footer.tsx
│   │   │   └── 📄 header.tsx
│   │   ├── 📁 ui/
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   └── 📄 input.tsx
│   │   └── 📄 session-provider.tsx
│   ├── 📁 dashboard/
│   │   ├── 📁 paciente/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 profesional/
│   │   │   └── 📄 page.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 lib/
│   │   ├── 📄 auth.ts
│   │   └── 📄 prisma.ts
│   ├── 📄 favicon.ico
│   ├── 📄 globals.css
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📁 node_modules/
├── 📁 prisma/                        # Configuración de base de datos
│   └── 📄 schema.prisma
├── 📁 public/                        # Archivos estáticos
├── 📄 .env                           # Variables de entorno locales
├── 📄 .gitignore
├── 📄 .vercelignore                  # Configuración Vercel
├── 📄 eslint.config.mjs              # ESLint
├── 📄 next-env.d.ts                  # Tipos Next.js
├── 📄 next.config.js                # Configuración Next.js
├── 📄 package-lock.json
├── 📄 package.json                   # Dependencias y scripts
├── 📄 postcss.config.mjs             # PostCSS
├── 📄 proxy.ts                       # Protección de rutas
├── 📄 README.md
├── 📄 tsconfig.json                  # TypeScript
└── 📄 vercel.json                    # Configuración Vercel
