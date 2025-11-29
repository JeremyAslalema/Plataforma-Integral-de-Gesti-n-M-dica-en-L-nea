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
├── 📁 .next/                         # Build de Next.js (AUTO-GENERADO)
├── 📁 app/                           # Next.js App Router
│   ├── 📁 api/                       # Endpoints API
│   │   └── 📁 auth/
│   │       ├── 📁 [...nextauth]/     # NextAuth.js
│   │       │   └── 📄 route.ts
│   │       └── 📁 register/          # Registro de usuarios
│   │           └── 📄 route.ts
│   ├── 📁 auth/                      # Páginas de autenticación
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 register/
│   │   │   └── 📄 page.tsx
│   │   └── 📄 layout.tsx
│   ├── 📁 components/                # Componentes reutilizables
│   │   ├── 📁 forms/                 # Formularios
│   │   │   ├── 📄 login-form.tsx
│   │   │   └── 📄 register-form.tsx
│   │   ├── 📁 layout/                # Componentes de layout
│   │   │   ├── 📄 footer.tsx
│   │   │   └── 📄 header.tsx
│   │   ├── 📁 ui/                    # Componentes UI base
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   └── 📄 input.tsx
│   │   └── 📄 session-provider.tsx   # Proveedor de autenticación
│   ├── 📁 dashboard/                 # Área privada
│   │   ├── 📁 paciente/              # Dashboard pacientes
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 profesional/           # Dashboard profesionales
│   │   │   └── 📄 page.tsx
│   │   └── 📄 page.tsx               # Dashboard principal
│   ├── 📁 lib/                       # Utilidades y configuraciones
│   │   ├── 📄 auth.ts                # Configuración NextAuth
│   │   └── 📄 prisma.ts              # Cliente de base de datos
│   ├── 📄 favicon.ico
│   ├── 📄 globals.css                # Estilos globales
│   ├── 📄 layout.tsx                 # Layout principal
│   └── 📄 page.tsx                   # Página de inicio
├── 📁 node_modules/                  # Dependencias (AUTO-GENERADO)
├── 📁 prisma/                        # Configuración de base de datos
│   └── 📄 schema.prisma              # Esquema de la base de datos
├── 📁 public/                        # Archivos estáticos
│   └── 📄 favicon.ico
├── 📄 .env.local                     # Variables de entorno LOCALES
├── 📄 .gitignore                     # Archivos ignorados por Git
├── 📄 .vercelignore                  # Configuración Vercel (OPCIONAL)
├── 📄 eslint.config.mjs              # Configuración ESLint
├── 📄 next-env.d.ts                  # Tipos Next.js (AUTO-GENERADO)
├── 📄 next.config.js                 # Configuración Next.js
├── 📄 package-lock.json              # Lock de dependencias (AUTO)
├── 📄 package.json                   # Dependencias y scripts
├── 📄 postcss.config.mjs             # Configuración PostCSS
├── 📄 README.md                      # Documentación del proyecto
├── 📄 tsconfig.json                  # Configuración TypeScript
└── 📄 vercel.json                    # Configuración Vercel