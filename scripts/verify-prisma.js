const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando estructura del proyecto...');

// Verificar si prisma/schema.prisma existe
const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
if (fs.existsSync(schemaPath)) {
  console.log('✅ schema.prisma encontrado:', schemaPath);
} else {
  console.log('❌ schema.prisma NO encontrado');
  // Listar contenido del directorio
  const rootFiles = fs.readdirSync(path.join(__dirname, '..'));
  console.log('📁 Archivos en root:', rootFiles);
  
  if (fs.existsSync(path.join(__dirname, '../prisma'))) {
    const prismaFiles = fs.readdirSync(path.join(__dirname, '../prisma'));
    console.log('📁 Archivos en prisma/:', prismaFiles);
  }
}

// Verificar node_modules
const prismaClient = path.join(__dirname, '../node_modules/@prisma/client');
if (fs.existsSync(prismaClient)) {
  console.log('✅ @prisma/client encontrado');
} else {
  console.log('❌ @prisma/client NO encontrado');
}