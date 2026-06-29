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