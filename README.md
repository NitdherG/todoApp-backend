## TodoApp Backend

Descripción
Backend para la aplicación de tareas (Todo App) diseñado para una prueba técnica. Este proyecto proporciona las API necesarias para la gestión de usuarios y tareas, utilizando Node.js y TypeScript, y desplegado en Firebase Functions.

Tecnologías Utilizadas
Node.js: Entorno de ejecución para JavaScript en el servidor.
Express: Framework para la creación de API REST.
TypeScript: Lenguaje que extiende JavaScript con tipado estático.
Firebase Functions: Plataforma de computación sin servidor para ejecutar código en la nube.
Firebase Admin SDK: Herramienta para interactuar con Firebase desde el backend.
dotenv: Biblioteca para gestionar variables de entorno.

Arquitectura
La arquitectura del backend se basa en los principios de Clean Code y Clean Architecture, organizando el código en capas bien definidas para promover la separación de responsabilidades y facilitar el mantenimiento y la escalabilidad.

Estructura del Proyecto


todoapp-backend/
├── src/
│   ├── app/
│   │   ├── useCases/
│   │   │   ├── tasks/
│   │   │   │   ├── AddTaskUseCase.ts
│   │   │   │   ├── DeleteTaskUseCase.ts
│   │   │   │   ├── GetTasksUseCase.ts
│   │   │   ├── users/
│   │   │   │   ├── AddUserUseCase.ts
│   │   │   │   ├── GetUserUseCase.ts
│   │   │   │   ├── DeleteUserUseCase.ts
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── Task.ts
│   │   │   ├── User.ts
│   │   ├── repositories/
│   │   │   ├── TaskRepository.ts
│   │   │   ├── UserRepository.ts
│   ├── infrastructure/
│   │   ├── firestore/
│   │   │   ├── FirestoreTaskRepository.ts
│   │   │   ├── FirestoreUserRepository.ts
│   │   │   ├── firebaseConfig.ts
│   ├── interfaces/
│   │   ├── controllers/
│   │   │   ├── TaskController.ts
│   │   │   ├── UserController.ts
│   │   ├── routes/
│   │   │   ├── taskRoutes.ts
│   │   │   ├── userRoutes.ts
│   ├── index.ts
├── serviceAccountKey.json
├── .env
├── .gitignore
├── nodemon.json
├── package.json
├── tsconfig.json




