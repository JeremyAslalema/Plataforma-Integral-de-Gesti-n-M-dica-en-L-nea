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
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/
│   │   └── 📁 auth/
│   │       └── 📁 [...nextauth]/
│   │           └── 📄 route.ts      # API NextAuth
├── 📁 lib/                         # Utilidades y configuraciones
│   |   |── 📄 auth.ts                  # Configuración NextAuth
│   │   |── 📄 prisma.ts                # Cliente de Prisma
│   ├── 📁 auth/                     # Páginas de autenticación
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx          # Página de login
│   │   ├── 📁 register/
│   │   │   └── 📄 page.tsx          # Página de registro
│   │   └── 📄 layout.tsx            # Layout de auth
│   ├── 📁 componets/                # Componentes (typo: debería ser "components")
│   │   ├── 📁 forms/
│   │   │   ├── 📄 login-form.tsx
│   │   │   └── 📄 register-form.tsx
│   │   ├── 📁 layout/
│   │   │   ├── 📄 footer.tsx
│   │   │   └── 📄 header.tsx
│   │   └── 📁 ui/
│   │       ├── 📄 button.tsx
│   │       ├── 📄 card.tsx
│   │       └── 📄 input.tsx
│   ├── 📁 dashboard/                # Área privada
│   │   ├── 📁 paciente/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 profesional/
│   │   │   └── 📄 page.tsx
│   │   └── 📄 layout.tsx
│   ├── 📄 favicon.ico
│   ├── 📄 globals.css              # Estilos globales
│   ├── 📄 layout.tsx               # Layout principal
│   └── 📄 page.tsx                 # Página principal
├── 📁 node_modules/
├── 📁 prisma/                      # Configuración de base de datos
│   └── 📄 schema.prisma            # Modelos de BD
├── 📁 public/                      # Archivos estáticos
├── 📄 .env                         # Variables de entorno
├── 📄 .gitignore
├── 📄 eslint.config.mjs
├── 📄 next-env.d.ts
├── 📄 next.config.ts
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 postcss.config.mjs
├── 📄 README.md
└── 📄 tsconfig.json