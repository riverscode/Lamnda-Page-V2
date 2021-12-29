---
title: "Crear un  parámetro compartido con la API de Revit | Revit API"
date: "Diciembre 29, 2021"
excerpt: "Un tutorial completo de como crear un parametro compartido con la API de Revit."
cover_image: "/images/posts/crear-parametro-compartido/cover.jpg"
---

Todos tenemos claro que lo mas importante de BIM es la I de información. En Revit tenemos esta información almacenada en los parámetros. Para este pequeño articulo hablaremos como haremos para crear un parámetro compartido y asignarlo a ciertas categorías. 

Iniciaremos nuestro proyecto según al publicación de [Mi primer addin con la API de Revit](https://lambda.com.pe/blog/mi-primer-addin) y tendríamos el siguiente código. 

```csharp
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SetFowrwork
{
    [Transaction(TransactionMode.Manual)]
    public class CmdSetFowrwork : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData,
                              ref string message,
                              ElementSet elements)
        {
						TaskDialog.show("Mi primer aplicativo", "Hola Mundo");
            return Result.Succeeded;
        }
    }
}
```

Hemos elegido [TransactionMode.Manual](https://www.revitapidocs.com/2022/84254a1f-7bba-885a-ce65-e68fc238fddb.htm) ya que haremos cambios en el documento, además  hemos iniciado mostrando un mensaje con [TaskDialog.show](https://www.revitapidocs.com/2022/77990692-a24d-eb40-5872-f3ceb2f76e60.htm) para saber si nuestro aplicativo funciona. Obteniendo como resultado una ventana simple como la que se muestra en la imagen.

![hello-world](/images/posts/crear-parametro-compartido/hello-world.png)

## METODO:  CreateParameter

Este método será el que usaremos para crear nuestro parámetro y asignarlo a las categorías elegidas. Para que nuestro código sea reutilizable asignaremos los siguientes parámetros.

```
|      NOMBRE    |           TIPO           |                         DESCRIPCION                        |
| -------------- | ------------------------ | ---------------------------------------------------------- |
| app            | Application              | Application app = uiDoc.Application.Application;           |
| doc            | Document                 | Representa el proyecto donde trabajamos.                   |
| CategorySet    | categorySet              | Lista de categorías donde asignaremos nuestro parámetro.   |
| parameterName  | string                   | Nombre del parámetro.                                      |
| parameterType  | ParameterType            | Tipo de parámetro.                                         |
| parameterGroup | BuiltInParameterGroup    | Grupo donde asignaremos nuestro parámetro.                 |
| visible        | bool                     | definimos si nuestro parámetro será visible.               |
```

### Crear un archivo de texto para almacenar nuestro SharedParameter

crearemos un archivo de texto .txt de manera temporal con el método [Path.GetTempFileName()](https://docs.microsoft.com/en-us/dotnet/api/system.io.path.gettempfilename?view=net-6.0) que posteriormente eliminaremos

```csharp
// Obtenemos la ruta de nuestro archivo actual de SharedParameter
string sharedParametersFilename = app.SharedParametersFilename;

string str = string.Concat(Path.GetTempFileName(), ".txt"); // Nombre del archivo temporal.
FileStream fileStream = File.Create(str) // Crear el archivo temporal
```

### Definimos propiedades de nuestro SharedParameter

```csharp
app.SharedParametersFilename = str;
ExternalDefinitionCreationOptions externalDefinitionCreationOption = new ExternalDefinitionCreationOptions(parameterName, parameterType);
externalDefinitionCreationOption.Visible = visible;
externalDefinitionCreationOption.UserModifiable = true;

string newGuid = Guid.NewGuid().ToString();
externalDefinitionCreationOption.GUID = new Guid(newGuid);

```

### Creamos un grupo dentro de nuestro SharedParameter

```csharp
ExternalDefinition externalDefinition = app.OpenSharedParameterFile()
                                            .Groups.Create("Lambda I&I")
                                            .Definitions
											.Create(externalDefinitionCreationOption) as ExternalDefinition;
```

### Eliminamos nuestro archivo temporal

```csharp
app.SharedParametersFilename = sharedParametersFilename;
File.Delete(str);
```

### Seleccionamos las categorías donde estará nuestro parámetro

```csharp
Binding binding = app.Create.NewInstanceBinding(categorySet);
BindingMap bindingMap = new UIApplication(app).ActiveUIDocument.Document.ParameterBindings;
bindingMap.Insert(externalDefinition, binding, parameterGroup);
DefinitionBindingMapIterator definitionBindingMapIterator = doc.ParameterBindings.ForwardIterator();
definitionBindingMapIterator.Reset();

while (definitionBindingMapIterator.MoveNext())
{
   if ((definitionBindingMapIterator.Key == null 
				|| !(definitionBindingMapIterator.Key.Name.ToUpper() == parameterName.ToUpper()) 
				? false 
				: ParameterType.Text == definitionBindingMapIterator.Key.ParameterType))
   {
       InternalDefinition key = definitionBindingMapIterator.Key as InternalDefinition;
       if (key != null)
       {
          try
          {
            key.SetAllowVaryBetweenGroups(doc, true);
          }
          catch { }
        }
    }
}
```

### Ejecutar nuestro método para crear el parámetro

Dentro de nuestro método **Execute** obtenemos las categorías donde asignaremos nuestro parámetro.

```csharp
CategorySet categorySet = new CategorySet();

categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_StructuralColumns));
categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_StructuralFraming));
categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_StructuralFoundation));
categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_Walls));
categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_Floors));
categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_Stairs));
```

Finalmente generamos una Transaction para hacer las modificaciones en el documento.

```csharp
using (Transaction trans = new Transaction(doc))
{
    trans.Start("Create Parameter");
    try
    {
       CreateParameter(app, 
					   doc, 
					   categorySet, 
					   ParameterType.Text, 
					   BuiltInParameterGroup.PG_SUPPORT, 
					   "Lambda test", 
					   true);
       trans.Commit();
    }
       catch (Exception ex)
    {
       TaskDialog.Show("Error", ex.Message);
       trans.RollBack();
       return Result.Failed;
    }
                
}
```

![result](/images/posts/crear-parametro-compartido/result.png)

### CODIGO COMPLETO

Para que sea mucho mas fácil entender como funcional el aplicativo te dejo el código completo para su análisis. 

```csharp
using System;
using System.IO;

using Autodesk.Revit.Attributes;
using Autodesk.Revit.ApplicationServices;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;

namespace SetFowrwork
{
    [Transaction(TransactionMode.Manual)]
    public class CmdSetFowrwork : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData,
                              ref string message,
                              ElementSet elements)
        {
            UIApplication uiApp = commandData.Application;
            UIDocument uiDoc = uiApp.ActiveUIDocument;
            Document doc = uiDoc.Document;

            Application app = uiDoc.Application.Application;

            CategorySet categorySet = new CategorySet();

            categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_StructuralColumns));
            categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_StructuralFraming));
            categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_StructuralFoundation));
            categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_Walls));
            categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_Floors));
            categorySet.Insert(Category.GetCategory(doc, BuiltInCategory.OST_Stairs));

            using (Transaction trans = new Transaction(doc))
            {
                    trans.Start("Create Lines");
                try
                {
                    CreateParameter(app, 
									doc, 
									categorySet, 
									ParameterType.Text, 
									BuiltInParameterGroup.PG_SUPPORT, 
									"Lambda test", 
									true);
                    trans.Commit();
                }
                catch (Exception ex)
                {

                    TaskDialog.Show("Error", ex.Message);
                    trans.RollBack();
                    return Result.Failed;
                }
                
            }
            return Result.Succeeded;
        }

        public void CreateParameter(Application app, 
                                    Document doc,
                                    CategorySet categorySet,
                                    ParameterType parameterType,
                                    BuiltInParameterGroup parameterGroup,
                                    string parameterName,
                                    bool visible)
        {

            string sharedParametersFilename = app.SharedParametersFilename;
            string str = string.Concat(Path.GetTempFileName(), ".txt");
            using (FileStream fileStream = File.Create(str)) { }

            app.SharedParametersFilename = str;
            ExternalDefinitionCreationOptions externalDefinitionCreationOption = new ExternalDefinitionCreationOptions(parameterName, parameterType);
            externalDefinitionCreationOption.Visible = visible;
            externalDefinitionCreationOption.UserModifiable = true;

            string newGuid = Guid.NewGuid().ToString();
            externalDefinitionCreationOption.GUID = new Guid(newGuid);

            ExternalDefinition externalDefinition = app.OpenSharedParameterFile()
                                                       .Groups.Create("Lambda")
                                                       .Definitions.Create(externalDefinitionCreationOption) as ExternalDefinition;

            app.SharedParametersFilename = sharedParametersFilename;
            File.Delete(str);

            Binding binding = app.Create.NewInstanceBinding(categorySet);
            BindingMap bindingMap = new UIApplication(app).ActiveUIDocument.Document.ParameterBindings;
            bindingMap.Insert(externalDefinition, binding, parameterGroup);
            DefinitionBindingMapIterator definitionBindingMapIterator = doc.ParameterBindings.ForwardIterator();
            definitionBindingMapIterator.Reset();

            while (definitionBindingMapIterator.MoveNext())
            {
                if ((definitionBindingMapIterator.Key == null 
										 || !(definitionBindingMapIterator.Key.Name.ToUpper() == parameterName.ToUpper()) 
										 ? false 
										 : ParameterType.Text == definitionBindingMapIterator.Key.ParameterType))
                {
                    InternalDefinition key = definitionBindingMapIterator.Key as InternalDefinition;
                    if (key != null)
                    {
                        try
                        {
                            key.SetAllowVaryBetweenGroups(doc, true);
                        }
                        catch
                        {
                        }
                    }
                }
            }
        }
    }
}
```

Espero que les sirva el pequeño tutorial sobre como crear. **¿Cómo apoyarme a seguir creando contenido?** simplemente compartan el articulo, síganme en [YouTube](https://www.youtube.com/c/RiversCode), [Instagram](https://www.instagram.com/rivers_code/) y [Facebook](https://www.facebook.com/LambdaInnovacion/).