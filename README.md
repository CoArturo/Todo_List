# Todo List - React + TypeScript
Monck de datos para Todo List https://my-json-server.typicode.com/CoArturo/MonckAPI

Instalacion:
- Descargar repositorio de GitHub
- Utilizar la consola de comando(PowerShell o cmd) para ejecutar los siguientes comandos:
  - node -v(para verificar si existe alguna version de node instalada)
  - npm install
  - npm run dev
  Luego copiar la direccion URL que se encuentra en el aparatado Local o en su defecto escribir
  la letra o y precionar ENTER. PAra este punto el aplicacion ya deberia estar corriendo correctamente.

Anotaciones importantes:
- El JWT y la autenticacion estan pacialmente implementada, el aplicacion es capaz de guardar un token
  en las cookies al momento de iniciar sesion, pero no fue posible la generacion de un token utilizando
  la libreria JWT. ¿Como afecta esto al funcionamiento? Dado que el aplicacion almacena un fake token
  que no contine la informacion del usuario si se recargara la pagina el contenido estaria vacio pero
  aun nos permite seguir navegando ya que la aplicacion solo revisa que exista un token en las cookies
  mas no que el mismo contenga informacion del usuario. Para solucionar el problema solo habra que
  precionar el boton de Log Out para borrar las cookies e iniciar sesion nuevamente pero ahora con toda
  la informacion pertinente.

Competencias desarrolladas
- Creación y Protección de Rutas en React con React Router DOM
  - Los usuarios solo seran capaces de acceder a las diferentes funciones luego de haberse logueado
    correctamente.
    
- Gestión de Tareas
  - Los usuarios pueden crear, editar, eliminar y marcar como completadas las tareas a razon de que se
    esta utilizando un mock de datos los cambios no se aplicaran realmente pero se podra visualizar en
    el network el resultado de la peticion para saber si se hizo correctamente.

- Interfaz de Usuario Personalizable
  - Los usuarios al registrarse pueden elegir un tema de preferencia que podra cambiar desde su perfil.

Componentes Reutilizables y Patrones de Diseño
  - Se utilizo el patron Container-Presentational para la reutilizacion de componententes que pueden ser
    utilizados posteriormente, por ejemplo las vistas de tareas penmdientes y realizadas utilizan el mismo
    componente de presentacion.
    
Manejo de Estado
  - Al momento de iniciar sesion se guarda toda la informacion del usuario en un estado para posteriormente
    ser usado, por ejemplo en el perfil aparecera la informacion actual del usuario.

Integración de Librerías de Componentes
  - Todos los elementos fueron trabajado con material UI para conservar la consistencia en el diseño.

Diseño Responsivo
  - La aplicacion fue desarrollada con mobile first para facilitar el diseño.

Seguridad:
   - Al cargar un componente se comprueba si existe un token almacenado en las cookies de lo contrario no
     se podra acceder a otra pagina que no sea el login o registro y de la misma forma el login solo sera
     accesible solo si no existe un token en las cookies.

Implementación de TypeScript
  - Se utilizo TypeScript para agregar tipado a la aplicacion y robustez al codigo.
  - Se implemento el diseño orientado a interfaces para algunos estados como los que estaban relacionados
    con los usuarios y las tareas.
   
