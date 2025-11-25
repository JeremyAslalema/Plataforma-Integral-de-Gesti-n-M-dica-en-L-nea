const fs = require('fs');
const path = require('path');

console.log('📦 Iniciando copia de archivos Prisma para standalone...');

// Archivos Prisma ESSENCIALES
const prismaFiles = [
  'node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node',
  'node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node',
  'node_modules/.prisma/client/query_engine-windows.dll.node',
  'node_modules/.prisma/client/schema.prisma',
  'node_modules/.prisma/client/index.js',
  'node_modules/.prisma/client/index.d.ts',
  'node_modules/.prisma/client/default.js',
  'node_modules/.prisma/client/default.d.ts'
];

// Directorios de destino
const destDirs = [
  '.next/standalone/node_modules/.prisma/client',
  '.next/standalone/node_modules/@prisma/client',
  '.next/standalone/node_modules/@prisma/client/runtime'
];

// Crear directorios de destino
destDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Directorio creado: ${dir}`);
  }
});

// Copiar archivos individuales
let copiedCount = 0;
prismaFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const dest = path.join('.next/standalone/node_modules/.prisma/client', path.basename(file));
    try {
      fs.copyFileSync(file, dest);
      console.log(`✅ Copiado: ${path.basename(file)}`);
      copiedCount++;
    } catch (error) {
      console.log(`❌ Error copiando ${file}:`, error.message);
    }
  } else {
    console.log(`⚠️ No encontrado: ${file}`);
  }
});

// Copiar @prisma/client completo
const copyDirRecursive = (source, target) => {
  if (!fs.existsSync(source)) return;
  
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const items = fs.readdirSync(source);
  
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirRecursive(sourcePath, targetPath);
    } else {
      try {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Copiado: ${item}`);
        copiedCount++;
      } catch (error) {
        console.log(`⚠️ Error copiando ${item}:`, error.message);
      }
    }
  }
};

// Copiar @prisma/client
copyDirRecursive('node_modules/@prisma/client', '.next/standalone/node_modules/@prisma/client');

// Copiar .prisma completo
copyDirRecursive('node_modules/.prisma', '.next/standalone/node_modules/.prisma');

// Copiar carpeta public si existe
if (fs.existsSync('public')) {
  copyDirRecursive('public', '.next/standalone/public');
  console.log('✅ Carpeta public copiada');
}

console.log(`\n🎉 PROCESO COMPLETADO!`);
console.log(`📊 Total archivos copiados: ${copiedCount}`);
console.log('🚀 La aplicación está lista para producción con Prisma');