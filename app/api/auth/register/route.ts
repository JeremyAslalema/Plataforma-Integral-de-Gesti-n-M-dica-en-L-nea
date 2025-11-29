import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      password, 
      name, 
      role = 'PACIENTE',
      phone,
      dateOfBirth,
      gender,
      address,
      specialty,
      license 
    } = body;

    // Validaciones básicas
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, contraseña y nombre son requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { 
        email: email.toLowerCase().trim() 
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Ya existe un usuario con este email' },
        { status: 409 }
      );
    }

    // SOLUCIÓN TEMPORAL: Quitar validación de licencia por ahora
    // if (role === 'DOCTOR' && license) {
    //   const existingDoctor = await prisma.user.findFirst({
    //     where: { 
    //       license: license 
    //     }
    //   });
    // 
    //   if (existingDoctor) {
    //     return NextResponse.json(
    //       { error: 'Ya existe un doctor con esta cédula profesional' },
    //       { status: 409 }
    //     );
    //   }
    // }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Preparar datos del usuario - versión básica temporal
    const userData: any = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      name: name.trim(),
      role,
    };

    // Agregar campos opcionales si existen
    if (phone) userData.phone = phone.trim();
    if (gender) userData.gender = gender.trim();
    if (address) userData.address = address.trim();
    if (dateOfBirth) userData.dateOfBirth = new Date(dateOfBirth);
    
    // Campos para doctores
    if (role === 'DOCTOR') {
      if (specialty) userData.specialty = specialty.trim();
      if (license) userData.license = license.trim();
    }

    // Crear usuario en la base de datos
    const user = await prisma.user.create({
      data: userData
    });

    // Eliminar password de la respuesta
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        success: true,
        message: 'Usuario registrado exitosamente',
        user: userWithoutPassword 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error en registro:', error);
    
    // Manejar errores específicos de Prisma
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      let message = 'Ya existe un usuario con estos datos';
      
      if (field === 'email') {
        message = 'Ya existe un usuario con este email';
      } else if (field === 'license') {
        message = 'Ya existe un doctor con esta cédula profesional';
      }
      
      return NextResponse.json(
        { 
          success: false,
          error: message 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Error interno del servidor. Intente nuevamente.' 
      },
      { status: 500 }
    );
  }
}