---
title: Mi primer addin con la API de Revit
date: "Diciembre 26, 2021"
excerpt: "Conoceremos como crear nuestro primer addin con la API de Revit"
cover_image: "/images/posts/mi-primer-addin/cover.jpg"
---

La tecnologia esta cambiando los habitos de las personas, desde mantenerlas informardas hasta volverlas mas exigentes, lo cual aporta en realización personal y laboral de cada persona, de tal manera que nos reinventemos para ofrecer buenas experiencias, responder a la demanda laboral, reducir costos, automatizar procesos, aumentar ingresos, etc. Es por ello que en este Post tratamos de compartir un granito de conocimiento de como ingresar al mundo de la API en Revit.

### Proyecto: HelloWorld

El aplicativo que crearemos mostrara un pequeño mensaje en el software de Revit.

Empezaremos creando un proyecto con la opción de **_Crear un Proyecto_** en el software de Visual Studio. La version usada es la version 2019, pero el interfaz para las otras versiones no varia de manera importante.

![1.jpg](/images/posts/mi-primer-addin/1.jpg)

Crearemos una [librería de clases (.dll)](https://docs.microsoft.com/es-es/dotnet/standard/class-libraries) del cual encontraremos dos tipos en Visual Studio 2019, el .NET Framework con C# y .NET Framework con VB.

```
| Lenguaje        |                Caracteristicas                  |
| _______________ | ___________________________________             |
| Con C#          | Existe mayor documentación para desarrolladores |
| Con VB          | La cantidad de documentación es limitada.       |
```

![2.jpg](/images/posts/mi-primer-addin/2.jpg)

Para nuestro proyecto usaremos el .NET Framework con C#.

Luego definiremos el **nombre de la solución** y **nombre de proyecto** del aplicativo que procederemos a crear. Hay que entender la diferencia del nombre del proyecto y el nombre de la solución.

- **Nombre de la Solución** Es la solución a un problema general que puede englobar varios proyectos.

- **Nombre del Proyecto:** Dimension o parte de la solución del problema general

En el presente aplicativo nombraremos al proyecto y a la solución como “HelloWorld” dado que no hay mucha complejidad y solamente tendremos un proyecto. En posteriores aplicaciones crearemos proyectos más complejos y sera necesario manejar mejor esta nomenclatura.

Otro tema importante de ver al momento de crear nuestro aplicativo es tener en cuenta la version de .NET Framework. La elección de la version dependerá en la versión de Revit.

```
| Version Revit | .NET Framework |
| ------------- | -------------- |
| 2016          | Versión 4.5    |
| 2017          | Versión 4.5.2  |
| 2018          | Versión 4.6.2  |
| 2019          | Versión 4.7    |
| 2020          | Versión 4.7.2  |
| 2021          | Versión 4.8    |
```

Usaremos el .NET Framework 4.7.2 para aplicarlo en el Revit 2020.

![3.jpg](/images/posts/mi-primer-addin/3.jpg)

[Visual Studio](https://visualstudio.microsoft.com/es/) es uno de los mejores IDE que existen en el mercado dado que te facilitan notablemente el trabajo que realizamos. Si seguimos paso a paso las configuraciones del procedimiento anterior llegaremos hasta este punto.

![4.2.jpg](/images/posts/mi-primer-addin/4.jpg)

Procederemos a renombrar el nombre de la clase “Class1.cs” por “CmdHelloWorld”. Una buena practica personal es nombrar al inicio de cada comando con la palabra “Cmd” para hacer más rápido la identificaciones entre las clases que creemos

![5.jpg](/images/posts/mi-primer-addin/5.jpg)

![6.jpg](/images/posts/mi-primer-addin/6.jpg)

Agregaremos las referencias (.dll) de las librerías de Revit que nos permitirá interactuar con los métodos y propiedades de Autodesk Revit. Para este pequeño aplicativo solo agregaremos “RevitAPI” y “RevitAPIUI” que la podremos encontrar en la ruta “C:\Program Files\Autodesk\Revit 20XX”

![7.jpg](/images/posts/mi-primer-addin/7.jpg)

Una vez agregadas las referencias, seleccionamos ambos “RevitAPI” y “RevitAPIUI” y en sus propiedades cambiamos el campo de “Copia local” a “False”, esto por el siguiente motivo.

Visual Studio no sabe de que estamos trabajando un aplicativo para Revit, entonces la copia local significa que va a copiar localmente todos los archivos relacionados con la API de Revit, pero como en este caso crearemos un aplicativo que va a funcionar dentro del entorno de la API de Revit no es necesario volver a copiar las librerias porque ya los tiene internamente.

![8.jpg](/images/posts/mi-primer-addin/8.jpg)

Ahora agregaremos los namespace necesarios a Visul Studio los cuales contienen clases, métodos y propiedades de Revit.

![9.jpg](/images/posts/mi-primer-addin/9.jpg)

Podemos encontrar todos los namespace de Revit en el siguiente [link:](https://www.revitapidocs.com/2020/)

Luego debemos crear un IExternalCommand(Comando externo) para eso implementaremos una interfaz de la cual se hereda propiedades y métodos, esto lo creamos con el fin de tener una estructura definida, para este caso Revit necesita una estructura denominada [Execute](https://www.revitapidocs.com/2022/ab42c8d3-d361-88d2-5043-2d427d1238fc.htm).

![10.jpg](/images/posts/mi-primer-addin/10.jpg)

Ya con la estructura implementada procederemos a devolver un resultado del aplicativo, para eso borramos el texto “throw new NotImplementedException()”.

![11.jpg](/images/posts/mi-primer-addin/11.jpg)

Visual Studio nos muestra un error porque nosotros estamos creando un método que devuelva un resultado pero aun no hemos escrito el resultado, para eso ingresaremos el siguiente código.

![12.jpg](/images/posts/mi-primer-addin/12.jpg)

Y procedemos a escribir lo siguiente.

```csharp
return Result.Succeeded;
```

lo cual indica que el resultado que estamos devolviendo es exitoso.

**Nota:** Tener en cuenta que cuando escribimos un código siempre termina con punto y coma (;).

![13.jpg](/images/posts/mi-primer-addin/13.jpg)

Luego crearemos un [TaskDialog](https://www.revitapidocs.com/2022/5aaa0247-7707-7508-4973-009b01669297.htm) el cual es un método que tiene dos entradas un “titulo” y una “descripción”, para eso escribiremos el siguiente código.

```csharp
TaskDialog.Show("Mi primer aplicativo", "Hola Mundo");
```

![14.jpg](/images/posts/mi-primer-addin/14.jpg)

Ahora faltaria añadir el transaction que va entre corchetes [ ], el cual nos permitira comunicarnos con toda la base de datos de Revit, encontraremos dos tipos:

```
| TransactionMode | Descripción                          |
| --------------- | ------------------------------------ |
| ReadOnly:       | Solo modo de lectura.                |
| Manual:         | Te permite realizar cambios a Revit. |
```

![15.jpg](/images/posts/mi-primer-addin/15.jpg)

Luego crearemos el archivo manifiesto el cual es indispensable para generar el vinculo entre la (.dll) que estamos creando y Revit.

![17.jpg](/images/posts/mi-primer-addin/17.jpg)

![16.jpg](/images/posts/mi-primer-addin/16.jpg)

Luego ingresamos al siguiente [Link](https://gist.github.com/riverscode/e5c8e4a3446bd6e3fb142a42b8dfe6ff) donde encontraremos una porción del codigo que va en el archivo manifiesto.

```csharp
<?xml version="1.0" encoding="utf-8" standalone="no"?>
<RevitAddIns>
  <AddIn Type="Command">
    <Assembly>HelloWorld.dll</Assembly>
    <AddInId>ecb76306-3561-43f3-adc7-01d1a178e74e</AddInId>
    <FullClassName>HelloWorld.CmdHelloWorld</FullClassName>
    <Text>Hola Mundo</Text>
    <VendorId>ADSK</VendorId>
    <VendorDescription>Lambda Ingenieria e Innovacion, https://lambda.com.pe</VendorDescription>
    <VisibilityMode>NotVisibleInFamily</VisibilityMode>
    <Discipline>Any</Discipline>
  </AddIn>
</RevitAddIns>
```

```
| Campos            | Descripción                                                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AddIn Type        | Tipo de aplicativo que podria ser “Command” o “Aplication”                                                                                                        |
| Assembly          | Es la ruta donde esta el aplicativo (.dll).                                                                                                                       |
| AddInId           | Es el Guid, es una codificación de microsoft para identificar sus documentos, archivos, elementos en general; esto podemos generarlo a partir del siguiente link. |
| FullClassName     | Es la clase donde esta el método execute.                                                                                                                         |
| Text              | Es el nombre como se va a mostrar dentro del aplicativo.                                                                                                          |
| VendorId          | Puede ser cualquier texto.                                                                                                                                        |
| VendorDescription | Una descripción del aplicativo, para que sirve.                                                                                                                   |
| VisibilityMode    | NotVisibleInFamily: Que no se aplicara dicho applicativo en una familia.                                                                                          |
| Discipline        | Disciplina según la especialidad en que se trabajara (Arquitectura, Estructura, Electrica, Mecanicas, Etc).                                                       |
```

Luego agregaremos a Visual Studio los eventos de compilación, los cuales despues de compilar un addin dentro de Revit. Permite compilar los archivos .dll y .addin dentro de una caperta que Revit leera el manifiesto y podra cargar nuestro addin, podemos encontrar estos eventos en el siguiente [link](https://gist.github.com/riverscode/66b6acac8cd453ad8dac6e553fce9f56).

```csharp
copy "$(ProjectDir)*.addin" "$(AppData)\Autodesk\REVIT\Addins\2020"
copy "$(ProjectDir)bin\debug\*.dll" "$(AppData)\Autodesk\REVIT\Addins\2020"
```

![19.jpg](/images/posts/mi-primer-addin/19.jpg)

![20.jpg](/images/posts/mi-primer-addin/20.jpg)

Como último paso, despues ingresar estos eventos procedemos a compilar el aplicativo, el cual nos dara como resultado que el aplicativo se compilo dentro de Revit.

![21.jpg](/images/posts/mi-primer-addin/21.jpg)

Abrimos Revit 2020 y nos saldra una notificación indicando que se ingresera un aplicativo a Revit donde debemos seleccionar la opción “Cargar siempre”.

![22.jpg](/images/posts/mi-primer-addin/22.jpg)

Una vez realizado eso abrimos un proyecto de ejemplo en Revit, nos vamos a la pestaña de complementos/Herramientas externas/Hola Mundo.

![23jpg.jpg](/images/posts/mi-primer-addin/23.jpg)

Como producto final vemos el mensaje que nos muestra nuestro primer aplicativo.

![24jpg.jpg](/images/posts/mi-primer-addin/24.jpg)

Y eso es todo. Es un proceso corto pero vale la pena intentarlo y probarlo, sumemonos todos para poder formar una comunidad de personas que tengan las ganas de ingresar a este nuevo mundo de la programación.

Para más contenido suscríbanse al canal y compártanlo para que este tipo de contenido llegue a más personas.

Si necesitan más información sobre este increíble mundo de la automatización de procesos a través de la creación de aplicaciones en Autodesk Revit no duden en escribirme a mi LinkedIn [Bryan Espinoza Allcca](https://www.linkedin.com/in/bryan-espinoza-bim/) o dejar comentarios debajo de este post.
