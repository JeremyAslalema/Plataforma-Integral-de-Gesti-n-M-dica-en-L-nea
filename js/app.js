class MedicalPlatform {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthStatus();
        this.createDemoUsers();
        this.setupRoleToggle();
    }

    loadUsers() {
        const stored = localStorage.getItem('medicalPlatformUsers');
        return stored ? JSON.parse(stored) : {};
    }

    saveUsers() {
        localStorage.setItem('medicalPlatformUsers', JSON.stringify(this.users));
    }

    createDemoUsers() {
        const demoUsers = {
            'paciente@demo.com': {
                email: 'paciente@demo.com',
                password: '123456',
                role: 'paciente',
                profile: {
                    firstName: 'Ana',
                    lastName: 'García',
                    phone: '+34 612 345 678',
                    specialization: '',
                    avatar: '👩‍💼'
                },
                id: 'demo-paciente-001'
            },
            'doctor@demo.com': {
                email: 'doctor@demo.com',
                password: '123456',
                role: 'doctor',
                profile: {
                    firstName: 'Dr. Carlos',
                    lastName: 'Martínez',
                    phone: '+34 600 123 456',
                    specialization: 'Cardiología',
                    licenseNumber: 'MED-12345',
                    avatar: '👨‍⚕️'
                },
                id: 'demo-doctor-001'
            }
        };

        Object.keys(demoUsers).forEach(email => {
            if (!this.users[email]) {
                this.users[email] = demoUsers[email];
            }
        });
        
        this.saveUsers();
    }

    setupRoleToggle() {
        const roleSelect = document.getElementById('role');
        const specializationGroup = document.getElementById('specialization-group');
        
        roleSelect.addEventListener('change', (e) => {
            if (e.target.value === 'doctor') {
                specializationGroup.style.display = 'block';
            } else {
                specializationGroup.style.display = 'none';
            }
        });
    }

    bindEvents() {
        // Navegación
        document.getElementById('show-register').addEventListener('click', () => this.showSection('register'));
        document.getElementById('show-login').addEventListener('click', () => this.showSection('login'));
        
        // Formularios
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register-form').addEventListener('submit', (e) => this.handleRegister(e));
        
        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());
        
        // Demo accounts
        document.querySelectorAll('.demo-card').forEach(card => {
            card.addEventListener('click', () => {
                const email = card.dataset.email;
                const password = card.dataset.password;
                document.getElementById('email').value = email;
                document.getElementById('password').value = password;
                this.showNotification('Credenciales cargadas ✅', 'success');
            });
        });

        // Navegación del dashboard
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                this.showFeature(item.dataset.feature);
            });
        });
    }

    showSection(sectionName) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`).classList.add('active');
    }

    async handleLogin(e) {
        e.preventDefault();
        this.showLoading(true);

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        // Simular autenticación
        await new Promise(resolve => setTimeout(resolve, 2000));

        const user = this.users[email];
        
        if (user && user.password === password) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.showDashboard();
            this.showNotification(`¡Bienvenido ${user.profile.firstName}! 🎉`, 'success');
        } else {
            this.showNotification('Credenciales incorrectas. Usa las cuentas de demo.', 'error');
        }
        
        this.showLoading(false);
    }

    async handleRegister(e) {
        e.preventDefault();
        this.showLoading(true);

        const formData = new FormData(e.target);
        const userData = {
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role'),
            profile: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                specialization: formData.get('specialization') || '',
                phone: '',
                licenseNumber: formData.get('role') === 'doctor' ? 'LIC-' + Math.random().toString(36).substr(2, 9) : '',
                avatar: formData.get('role') === 'doctor' ? '👨‍⚕️' : '👩‍💼'
            },
            id: 'user-' + Date.now()
        };

        await new Promise(resolve => setTimeout(resolve, 2000));

        if (this.users[userData.email]) {
            this.showNotification('El usuario ya existe', 'error');
        } else {
            this.users[userData.email] = userData;
            this.saveUsers();
            this.currentUser = userData;
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.showDashboard();
            this.showNotification(`¡Cuenta creada exitosamente! Bienvenido ${userData.profile.firstName} 🚀`, 'success');
        }
        
        this.showLoading(false);
    }

    showDashboard() {
        const user = this.currentUser || JSON.parse(localStorage.getItem('currentUser'));
        
        if (user) {
            // Actualizar información de usuario
            document.getElementById('user-name').textContent = `${user.profile.firstName} ${user.profile.lastName}`;
            document.getElementById('user-role').textContent = user.role === 'doctor' ? 'Médico' : 'Paciente';
            document.getElementById('user-avatar').textContent = user.profile.avatar;
            
            this.showSection('dashboard');
            this.showFeature('welcome');
        }
    }

    showFeature(feature) {
        const featureSection = document.getElementById('feature-section');
        const features = {
            welcome: this.getWelcomeFeature(),
            perfil: this.getProfileFeature(),
            citas: this.getAppointmentsFeature(),
            pacientes: this.getPatientsFeature(),
            historial: this.getHistoryFeature(),
            analytics: this.getAnalyticsFeature()
        };

        featureSection.innerHTML = features[feature] || this.getWelcomeFeature();
        
        // Actualizar título del dashboard
        const titles = {
            welcome: 'Dashboard Principal',
            perfil: 'Gestión de Perfil',
            citas: 'Sistema de Citas',
            pacientes: 'Gestión de Pacientes',
            historial: 'Historial Médico',
            analytics: 'Analíticas del Sistema'
        };
        
        document.getElementById('dashboard-title').textContent = titles[feature];
        document.getElementById('dashboard-subtitle').textContent = 'Sistema de gestión médica integral';
    }

    getWelcomeFeature() {
        return `
            <div class="feature-content">
                <div class="welcome-hero">
                    <div class="hero-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <h2>¡Bienvenido al Futuro de la Medicina! 🚀</h2>
                    <p>Tu plataforma médica inteligente está lista para usar</p>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-box">
                        <i class="fas fa-bolt"></i>
                        <h3>Rendimiento</h3>
                        <p>99.9% Uptime</p>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-shield-alt"></i>
                        <h3>Seguridad</h3>
                        <p>Encriptación AES-256</p>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-users"></i>
                        <h3>Usuarios</h3>
                        <p>10K+ Activos</p>
                    </div>
                </div>

                <div class="quick-actions">
                    <h3>Acciones Rápidas</h3>
                    <div class="actions-grid">
                        <div class="action-card">
                            <i class="fas fa-calendar-plus"></i>
                            <span>Nueva Cita</span>
                        </div>
                        <div class="action-card">
                            <i class="fas fa-file-medical"></i>
                            <span>Ver Historial</span>
                        </div>
                        <div class="action-card">
                            <i class="fas fa-chart-line"></i>
                            <span>Reportes</span>
                        </div>
                        <div class="action-card">
                            <i class="fas fa-cog"></i>
                            <span>Configuración</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getProfileFeature() {
        return `
            <div class="feature-content">
                <h2><i class="fas fa-user-cog"></i> Mi Perfil</h2>
                <div class="profile-grid">
                    <div class="profile-card">
                        <h3>Información Personal</h3>
                        <div class="profile-info">
                            <p><strong>Nombre:</strong> ${this.currentUser.profile.firstName} ${this.currentUser.profile.lastName}</p>
                            <p><strong>Email:</strong> ${this.currentUser.email}</p>
                            <p><strong>Rol:</strong> ${this.currentUser.role}</p>
                            ${this.currentUser.profile.specialization ? `<p><strong>Especialización:</strong> ${this.currentUser.profile.specialization}</p>` : ''}
                            ${this.currentUser.profile.licenseNumber ? `<p><strong>Licencia:</strong> ${this.currentUser.profile.licenseNumber}</p>` : ''}
                        </div>
                    </div>
                    <div class="profile-card">
                        <h3>Estadísticas</h3>
                        <div class="profile-stats">
                            <div class="stat-item">
                                <span class="stat-value">15</span>
                                <span class="stat-label">Citas este mes</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">92%</span>
                                <span class="stat-label">Satisfacción</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getAppointmentsFeature() {
        return `
            <div class="feature-content">
                <h2><i class="fas fa-calendar-check"></i> Sistema de Citas</h2>
                <p>Gestión inteligente de citas médicas en tiempo real</p>
                
                <div class="appointment-dashboard">
                    <div class="appointment-stats">
                        <div class="stat-card-large">
                            <i class="fas fa-clock"></i>
                            <div>
                                <h3>Próximas Citas</h3>
                                <span class="stat-number">5</span>
                            </div>
                        </div>
                        <div class="stat-card-large">
                            <i class="fas fa-check-circle"></i>
                            <div>
                                <h3>Completadas</h3>
                                <span class="stat-number">12</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="appointment-list">
                        <h3>Próximas Citas Programadas</h3>
                        <div class="appointment-item">
                            <div class="appointment-time">
                                <span class="date">15 Nov</span>
                                <span class="time">10:00 AM</span>
                            </div>
                            <div class="appointment-info">
                                <h4>Consulta de Seguimiento</h4>
                                <p>Dr. Martínez - Cardiología</p>
                            </div>
                            <div class="appointment-status confirmed">
                                Confirmada
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getPatientsFeature() {
        return `
            <div class="feature-content">
                <h2><i class="fas fa-users"></i> Gestión de Pacientes</h2>
                <p>Panel de control para administración de pacientes</p>
                
                <div class="patients-grid">
                    <div class="patient-card">
                        <div class="patient-avatar">👤</div>
                        <div class="patient-info">
                            <h4>María González</h4>
                            <p>Última visita: 10 Nov 2023</p>
                        </div>
                        <div class="patient-status active">Activo</div>
                    </div>
                    <div class="patient-card">
                        <div class="patient-avatar">👤</div>
                        <div class="patient-info">
                            <h4>Juan Rodríguez</h4>
                            <p>Próxima cita: 20 Nov 2023</p>
                        </div>
                        <div class="patient-status scheduled">Programado</div>
                    </div>
                </div>
            </div>
        `;
    }

    getHistoryFeature() {
        return `
            <div class="feature-content">
                <h2><i class="fas fa-file-medical"></i> Historial Médico</h2>
                <p>Registro completo y seguro de historiales médicos</p>
                
                <div class="history-timeline">
                    <div class="timeline-item">
                        <div class="timeline-date">10 Nov 2023</div>
                        <div class="timeline-content">
                            <h4>Consulta de Rutina</h4>
                            <p>Presión arterial: 120/80 mmHg</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">25 Oct 2023</div>
                        <div class="timeline-content">
                            <h4>Análisis de Sangre</h4>
                            <p>Resultados dentro de parámetros normales</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getAnalyticsFeature() {
        return `
            <div class="feature-content">
                <h2><i class="fas fa-chart-bar"></i> Analíticas del Sistema</h2>
                <p>Métricas y estadísticas en tiempo real</p>
                
                <div class="analytics-grid">
                    <div class="metric-card">
                        <i class="fas fa-user-clock"></i>
                        <div class="metric-info">
                            <h3>Tiempo de Respuesta</h3>
                            <span class="metric-value">87ms</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <i class="fas fa-database"></i>
                        <div class="metric-info">
                            <h3>Uso de Almacenamiento</h3>
                            <span class="metric-value">45%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showSection('login');
        this.showNotification('Sesión cerrada exitosamente 👋', 'success');
    }

    checkAuthStatus() {
        const user = localStorage.getItem('currentUser');
        
        if (user) {
            this.currentUser = JSON.parse(user);
            this.showDashboard();
        }
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        if (show) {
            loading.style.display = 'flex';
        } else {
            loading.style.display = 'none';
        }
    }

    showNotification(message, type) {
        const notification = document.getElementById('notification');
        const icon = notification.querySelector('.notification-icon');
        const messageEl = notification.querySelector('.notification-message');
        
        notification.className = `notification ${type}`;
        icon.className = `notification-icon fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}`;
        messageEl.textContent = message;
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    new MedicalPlatform();
});