# Sistema de votaciones electronicas mediante el uso de una Blockchain
## Blockchain

La implementacion de la blockchain se llevo acabo simulandola desde Python y Flask.

Instalacion de dependencias
```sh
$ cd blockchain
$ pip install -r requirements.txt
$ pip install -U flask-cors
```

Inicializar blockchain
```sh
$ cd blockchain
$ python node_server.py
```

El nodo de la blockchain se ejecuta a traves del puerto 8000

## Aplicacion

La interfaz de usuario se implemento en Angular y Firebase

Instalacion de dependencias de Angular
```sh
$ cd blockchain-view
$ npm install
$ ng add @angular/fire
```

Firebase se encarga del manejo de usuarios.
 - Crear un proyecto en [Firebase](https://firebase.google.com/)
    ![image.png](https://github.com/daniii3012/RedesIII-Blockchain/raw/master/imagenes/creacion_firebase.png)
 - Crear una aplicacion web.
    ![image.png](https://github.com/daniii3012/RedesIII-Blockchain/raw/master/imagenes/aplicacion_web.png)
 - Copiar la configuracion de la aplicacion de Firebase a la variable de entorno en angular `/blockchain-view/src/environments/environment.ts`
    ```sh
    export const environment = {
      production: false,
      firebase: {
        apiKey: '<your-key>',
        authDomain: '<your-project-authdomain>',
        projectId: '<your-project-id>',
        storageBucket: '<your-storage-bucket>',
        messagingSenderId: '<your-messaging-sender-id>',
        appId: '<your-app-id>',
      }
    };
    ```
 - Habilitar la Autenticacion por correo en el proyecto de Firebase
    ![image.png](https://github.com/daniii3012/RedesIII-Blockchain/raw/master/imagenes/sign_in_email.png)
    - Crear algunas credenciales de usuario
        ![image.png](https://github.com/daniii3012/RedesIII-Blockchain/raw/master/imagenes/usuarios.png)
 - Habilitar la base de datos en Cloud Firestore del proyecto de Firebase
    - Crear la coleccion `users` y en ella añadir un documento por usuario con los siguientes campos
        ```sh
        email [String]: correo del usuario
        id [String]: UID mostrado en la ventana de Autenticacion
        role [String]: user / admin (Establecer el rol de la cuenta)
        vote [Boolean]: false
        ```
        ![image.png](https://github.com/daniii3012/RedesIII-Blockchain/raw/master/imagenes/firestore.png)


Inicializar aplicacion

```sh
$ cd blockchain-view
$ ng serve
```

La aplicacion se encuentra corriendo en el puerto 4200

Imagenes:
![image.png](https://github.com/daniii3012/RedesIII-Blockchain/raw/master/imagenes/login.png)
![image.png](https://github.com/daniii3012/RedesIII-Blockchain/raw/master/imagenes/user_vote.png)
![image.png](https://github.com/daniii3012/RedesIII-Blockchain/raw/master/imagenes/admin.png)
