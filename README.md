# Discord Bot Template
En pocas palabras hice esto para poder ayudar a personas que andan iniciando un proyecto, con conocimientos basicos de JavaScript.

Hice este template con la versión master de `discord.js-light` por lo que puede haber errores en el futuro, de todas maneras la actualizaré en el transcurso del tiempo

El uso es sencillo, puedes modificarlo a tu gusto, pero esta hecho con una base que consideraria buena.

## Archivo .env
Para empezar, debes crear tu archivo .env y deberas poner el token de tu bot y los desarroladores del bot(opcional)
```
BOT_PREFIX=El prefijo de tu bot.
BOT_TOKEN=El token de tu bot de discord.
DEVS=IDs de los desarrolladores separada por ", ".
```

## Instalación de dependencias e inicio
Esto es tan simple como ejecutar `npm i` en la consola, para poder descargarlas.

Una vez ya descargadas las dependencias y colocado lo requerido en el archivo `.env`, puedes iniciar tu proyecto de dos formas, usando `node .` o `npm start`, hay variaciones, pero bueno supongo que ustedes sabrán como hacerlo.

## Importante
Debes considerar modificar el archivo `Client.js` para ver la "configuración" de tu bot, como los intents, lo que se guardará en caché, entre otros.

Asimismo, añadirle quizá una base de datos, para tener un prefix personalizable.

Se puede borrar el archivo `index.js` y renombrar el `bot.js` por este, en caso de no querer usar **shards**. *(recomendable para bots que recién estan empezando)*

## Contacto
Si tienen alguna duda acerca de la base del bot no duden en contactarme.

**Tag:** Abbie.#6500 `(710880777662890095)`

Y también soy moderador de un servidor que se dedica a este tipo de ayuda, por lo que si te interesa también pueden contactarme por ahí. **[Invitación](https://discord.gg/g6ssSmK)**
