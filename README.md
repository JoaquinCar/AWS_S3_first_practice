AWS S3 File Server - Learning Project
Este proyecto fue desarrollado como parte de mi proceso de aprendizaje sobre AWS, específicamente enfocado en el servicio Amazon S3 (Simple Storage Service) y la integración con aplicaciones Java Spring Boot.

Propósito del Proyecto
El objetivo principal de este proyecto fue aprender y practicar:

Configuración y uso de servicios AWS
Creación y gestión de buckets S3
Implementación de operaciones CRUD con archivos en S3
Gestión segura de credenciales AWS
Desarrollo de una API REST con Spring Boot
Creación de una interfaz de usuario sencilla pero funcional
Implementación AWS
Configuración de IAM
Para este proyecto, seguí las mejores prácticas de seguridad de AWS:

Creé un usuario IAM específico para la aplicación con permisos limitados
Apliqué el principio de privilegio mínimo, otorgando solo los permisos necesarios para S3:
s3:PutObject
s3:GetObject
s3:ListBucket
s3:DeleteObject
No utilicé las credenciales de usuario root
Configuré las credenciales como variables de entorno en lugar de hardcodearlas
Bucket S3
Creé un bucket S3 dedicado llamado mi-file-server-bucket-joaquin-carmona
Configuré la región us-east-2 para optimizar la latencia
Implementé una estructura de carpetas dentro del bucket para organizar los archivos
Detalles Técnicos
Backend (Spring Boot)
Configuración AWS: Implementé una clase AwsConfig para gestionar la conexión con AWS utilizando el SDK oficial
Servicio de Archivos: Desarrollé un FileService que encapsula todas las operaciones con S3:
Subida de archivos con validación de tipos y tamaño
Descarga de archivos
Listado de archivos con metadatos
Eliminación de archivos
API REST: Creé endpoints RESTful en FileController para todas las operaciones
Manejo de Errores: Implementé un sistema robusto de manejo de excepciones
Seguridad: Configuré CORS y aseguré que las credenciales AWS se carguen desde variables de entorno
Pruebas
El proyecto fue probado exhaustivamente utilizando:

Postman: Para probar todos los endpoints de la API:

Verificación de subida de archivos con diferentes tipos y tamaños
Pruebas de descarga de archivos
Validación de respuestas de error
Comprobación de listado de archivos
Pruebas Manuales: A través de la interfaz de usuario para verificar:

Experiencia de usuario
Manejo de errores en el frontend
Compatibilidad con diferentes navegadores
Consola AWS: Para verificar:

Correcta creación de objetos en S3
Metadatos adecuados
Permisos correctamente aplicados
Lecciones Aprendidas
Configuración adecuada de credenciales AWS para aplicaciones Spring Boot
Manejo eficiente de streams para subida y descarga de archivos
Implementación de metadatos en objetos S3
Gestión de CORS para permitir acceso desde el frontend
Importancia de la validación de archivos antes de subirlos a S3
Uso de variables de entorno para proteger información sensible
