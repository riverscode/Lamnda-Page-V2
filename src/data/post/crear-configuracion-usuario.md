---
title: "Crear Configuraciones de usuario con la API de Revit"
date: "Enero 09, 2022"
excerpt: "Un tutorial completo de como crear configuraciones de usuario."
cover_image: "/images/posts/crear-configuracion-usuario/cover.png"
---

Durante la semana se me contrato para un proyecto que consistía en el desarrollo de un aplicativo en Autodesk Revit. El aplicativo era sencillo, al inicio, se tenia que crear un addin que permita cuantificar la cantidad de **[Encofrado](https://es.wikipedia.org/wiki/Encofrado)** de elementos estructurales.

Uno sabe que realizar un aplicativo no solo se trata de crear lo que debería hacer, sino también crear funcionalidades alrededor de la función principal para que se genere una mejor [experiencia al usuario](https://es.wikipedia.org/wiki/Experiencia_de_usuario) durante su uso.

Por lo que decidí crear una lista de artículos enfocado en esas funcionalidades secundarias que ayudaran a mejorar la experiencia del usuario. La primera funcionalidad que hablare es como crear un interfaz para que el usuario pueda guardar configuraciones y utilizarlas. Para ser mas específicos esta funcionalidad le permitirá al usuario guardar el nombre del el parámetro donde se guardara el encofrado.

![Video de Encofrado (1).gif](/images/posts/crear-configuracion-usuario/video-encofrado.gif)

## Definir configuración

Dentro de las propiedades del proyecto tenemos de definir configuraciones para guardar la variable que utilizara el usuario.

![Definir Parametro.gif](/images/posts/crear-configuracion-usuario/definir-parametro.gif)

## Crear Interfaz de usuario

Crearemos un simple interfaz de usuario con un textbox que permitirá al usuario ingresar el valor del parámetro y dos botones para definir si acepta el cambio o cancela la ejecución del cambio.

![Untitled](/images/posts/crear-configuracion-usuario/user-interface.png)

Dentro del código del formulario recuperamos el valor actual de la variable Parámetro al iniciar nuestro formulario

```csharp
public fmrUserSettings()
{
  InitializeComponent();
  txtParameter.Text = (string)Properties.Settings.Default["Parameter"];
}
```

Luego guardaremos el valor que el usuario ingrese a nuestro textbox. Pero primero comprobamos que el valor ingresado no sea vacio.

```csharp
if (txtParameter.Text.Trim().Length == 0)
{
  MessageBox.Show("Escriba un parametro");
  return;
}
Properties.Settings.Default["Parameter"] = txtParameter.Text.Trim();
```

Eso seria toda la configuración necesaria para nuestro addin que mejora por mucho la experiencia del usuario, permitiéndole configurar el parámetro donde guardar su información.

![Untitled](/images/posts/crear-configuracion-usuario/exito.webp)

Este es un articulo super corto, espero que les sea de utilidad para sus próximos proyectos. En la parte inferior del blog tienen la posibilidad de escribir que otros temas les gustaría que escribiéramos. Por ultimo, este miércoles viene un post interesante así que no olviden de seguirme en mis redes sociales.

Espero que les sirva el pequeño tutorial sobre como crear. **¿Cómo apoyarme a seguir creando contenido?** simplemente compartan el articulo, síganme en [YouTube](https://www.youtube.com/c/RiversCode), [Instagram](https://www.instagram.com/rivers_code/) y [Facebook](https://www.facebook.com/LambdaInnovacion/).
