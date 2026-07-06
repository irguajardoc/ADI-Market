HITO 1 Y 2

ADI Market

Ignacio Guajardo

Proyecto desarrollado para el módulo de Desarrollo Full Stack.

Descripción del Proyecto

ADI Market (Automated Dispatch Interface) es una plataforma web que busca conectar empresas o personas que necesitan transportar carga con transportistas que disponen de espacio libre en sus rutas.

La aplicación permite publicar espacios disponibles para transporte, visualizar publicaciones disponibles y gestionar usuarios mediante una interfaz moderna desarrollada con React.

Objetivo

El objetivo principal es optimizar el uso de capacidad disponible en vehículos de transporte, permitiendo que usuarios encuentren rutas compatibles para sus cargas y que los transportistas puedan ofrecer espacios libres de manera sencilla.

Hito 1: Planificación y Diseño

Durante el desarrollo del Hito 1 se realizó:

Diseño de Vistas

Se definieron las siguientes pantallas principales:

Home
Marketplace
Login
Registro de usuarios
Perfil de usuario
Crear publicación
Detalle de publicación
Navegación

Se diseñó el flujo de navegación entre las diferentes vistas considerando:

Acceso público
Acceso autenticado
Flujo de publicaciones
Gestión de usuarios
Modelo de Datos

Se definieron las entidades principales:

Usuarios
id
nombre
email
contraseña
avatar
Publicaciones
id
origen
destino
fecha
espacio disponible
precio
descripción
Solicitudes
id
usuario
publicación
estado
Tecnologías Definidas

Frontend:

React
React Router
Bootstrap

Backend (planificado):

Node.js
Express

Base de Datos (planificada):

PostgreSQL


Hito 2: Desarrollo Frontend

Durante el Hito 2 se implementó la estructura inicial del proyecto utilizando React y Vite.

Creación del Proyecto

Se creó el proyecto mediante:

npm create vite@latest

Instalación de dependencias:

npm install
npm install react-router-dom
npm install bootstrap
Implementación de React Router

Se configuró navegación entre rutas mediante React Router.

Rutas implementadas:

Ruta	Vista
/	Home
/marketplace	Marketplace
/login	Login
/register	Registro
Componentes Reutilizables

Se desarrollaron componentes reutilizables para evitar duplicación de código.

Navbar

Componente encargado de:

Navegación principal
Buscador
Acceso a vistas
CardPublicacion

Props utilizadas:

<CardPublicacion
  origen="Santiago"
  destino="Temuco"
  m3="20"
  precio="45000"
/>

Uso de Props

Se implementó el paso de propiedades entre componentes para renderizar información dinámica.

Ejemplo:

origen
destino
metros cúbicos disponibles
precio
Uso de Hooks

Se implementó el Hook:

useState

Utilizado para almacenar y actualizar información ingresada por el usuario.

Ejemplo implementado en Marketplace:

const [origen, setOrigen] = useState("");

Permitiendo visualizar cambios en tiempo real dentro de la interfaz.

Uso de Context

Se inició la implementación de Context API para manejar información global del usuario autenticado.

Archivos utilizados:

src/context/AuthContext.jsx

Estructura del Proyecto
src
│
├── assets
├── components
│   ├── Navbar.jsx
│   └── CardPublicacion.jsx
│
├── context
│   └── AuthContext.jsx
│
├── data
│
├── pages
│   ├── Home.jsx
│   ├── Marketplace.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── Detail.jsx
│   └── CreatePost.jsx
│
├── routes
│   └── AppRoutes.jsx
│
├── App.jsx
└── main.jsx


Estado Actual del Proyecto

Actualmente ADI Market cuenta con:

Navegación mediante React Router.
Componentes reutilizables.
Renderización dinámica mediante Props.
Uso de Hooks.
Integración inicial de Context API.
Diseño responsive utilizando Bootstrap.
Próximos Pasos
Completar Context API.
Implementar autenticación.
Finalizar Perfil de Usuario.
Crear formulario de publicaciones.
Crear vista detalle de publicación.
Conectar Backend y Base de Datos.


HITO 3 – Backend API REST con PostgreSQL y JWT
Objetivo

En este hito se desarrolló el backend de ADI Market utilizando Node.js, Express y PostgreSQL. El objetivo fue construir una API REST capaz de gestionar la información del sistema, conectarse a una base de datos real, implementar autenticación mediante JWT y realizar pruebas de funcionamiento.

Tecnologías utilizadas
Node.js
Express.js
PostgreSQL
pg
JWT (jsonwebtoken)
bcryptjs
dotenv
cors
Jest
Supertest
Thunder Client
Configuración del proyecto

Se creó un proyecto Node.js utilizando npm e instalando todas las dependencias necesarias para el desarrollo del backend.

Se configuró además:

Variables de entorno mediante .env
Conexión a PostgreSQL utilizando pg
Middleware para manejo de JSON
Middleware CORS para permitir solicitudes externas
Conexión a PostgreSQL

Se creó una base de datos llamada:

adi_market

La API se conectó correctamente a PostgreSQL utilizando el archivo:

db.js

Validando la conexión mediante:

SELECT NOW();
Modelo de datos

Se crearon las tablas principales del proyecto:

usuarios

Almacena los usuarios registrados en la plataforma.

Campos principales:

id_usuario
nombre
email
password
telefono
fecha_creacion
estado
publicaciones

Almacena los espacios de carga publicados por los proveedores.

Campos principales:

id_publicacion
titulo
origen
destino
fecha_salida
hora_salida
estimado_llegada
m3_disponible
precio
restricciones
descripcion
id_usuario
solicitudes

Permite registrar solicitudes realizadas por los clientes sobre publicaciones existentes.

Datos de prueba

Se cargaron registros de prueba en la base de datos:

Usuarios
Ignacio Guajardo
Usuario Cliente
Publicaciones
Santiago → Temuco
Santiago → Valdivia
Santiago → Antofagasta
Santiago → Puerto Montt
Solicitudes

Se registró una solicitud asociada a una publicación existente para validar las relaciones entre tablas.

API REST desarrollada
Publicaciones
Obtener todas las publicaciones
GET /api/publicaciones
Obtener publicación por ID
GET /api/publicaciones/:id
Crear publicación
POST /api/publicaciones
Actualizar publicación
PUT /api/publicaciones/:id
Eliminar publicación
DELETE /api/publicaciones/:id
Autenticación JWT

Se implementó autenticación basada en JSON Web Token (JWT).

Registro de usuarios
POST /api/register

Permite crear nuevos usuarios almacenando la contraseña encriptada mediante bcrypt.

Inicio de sesión
POST /api/login

Valida credenciales y genera un token JWT válido por 24 horas.

Ejemplo de respuesta:

{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
Perfil protegido
GET /api/perfil

Ruta protegida mediante middleware JWT.

Solo puede acceder un usuario autenticado enviando:

Authorization: Bearer TOKEN
Middleware implementado

Se creó un middleware personalizado:

middlewares.js

Responsable de:

Validar JWT
Verificar autenticación
Permitir acceso a rutas protegidas
Modularización del proyecto

Con el objetivo de mantener una estructura ordenada, la API fue dividida en módulos.

Controllers
controllers/

Contienen la lógica de negocio de cada endpoint.

Routes
routes/

Definen las rutas de la API y las asocian con sus respectivos controladores.

Database
db.js

Maneja la conexión a PostgreSQL.

Pruebas automatizadas

Se utilizó:

Jest
Supertest

Para validar el correcto funcionamiento de la API.

Pruebas realizadas:

GET /
GET /api/test
GET /api/publicaciones
GET /api/publicaciones/999

Resultado:

4 pruebas ejecutadas
4 pruebas aprobadas
Pruebas manuales con Thunder Client

Se utilizó la extensión Thunder Client de Visual Studio Code para validar el funcionamiento de la API.

Pruebas realizadas:

GET /api/publicaciones
GET /api/publicaciones/:id
POST /api/register
POST /api/login
GET /api/perfil utilizando JWT

Estas pruebas se pueden visualizar en la carpeta en ../Backend/Thunder Client.

Al finalizar este hito se cuenta con una API REST funcional conectada a PostgreSQL, capaz de administrar publicaciones y usuarios, utilizando autenticación JWT, middleware de autorización, pruebas automatizadas con Supertest y pruebas manuales mediante Thunder Client.

