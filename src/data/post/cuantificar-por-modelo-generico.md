---
title: Cuantificar elementos MEP por zonas personalizadas con Modelos Genéricos | Revit API
date: "Enero 3, 2021"
excerpt: "Aprenderemos un nuevo método de cuantificar en Autodesk Revit mediante modelo genérico"
cover_image: "/images/posts/cuantificar-por-modelo-generico/cover.png"
---

Todos sabemos que la cuantificación de materiales en un proyecto es muy importante, ya que este valor por el P.U. es parte del presupuesto directo de un proyecto, los proyectos actualmente vienen implementando nuevas metodologías, herramientas, técnicas para la gestión y producción en obra, una de ellas son los trenes de trabajo en donde realizamos una sectorización con el fin de balancear los recursos tanto en Mano de obra, materiales, equipos y herramientas, por eso les presentamos un aplicativo que nos ayudara a cuantificar la cantidad de materiales en un determinado sector.

Empezaremos creando un nuevo proyecto en visual studio, la plantilla de **Librería de Clases (.NET Framework)** usando el lenguaje C#. A este proyecto lo nombraremos **QuantityBox**  y usaremos  .NET Framework 4.7.2. para Autodesk Revit 2019.

Iniciaremos nuestro proyecto según la publicación de [**Mi primer addin con la API de Revit**](https://lambda.com.pe/blog/mi-primer-addin) y tendríamos el siguiente código.

> **Nota:** Los siguientes pasos que se realizaran se explicaran de manera clara y resumida para el aplicativo que crearemos, pero si tienen dudas sobre primeros pasos de creación de un proyecto hasta la creación del interfaz los invito a revisar mi publicación de [**Mi primer addin con la API de Revit**](https://lambda.com.pe/blog/mi-primer-addin) para su mejor entendimiento.
>

```csharp
// Revit API Namespaces
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Selection;

namespace QuantityBox
{
    public class CmdQuantityBox : IExternalCommand
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

Luego accederemos a la variable [**Documento**](https://www.revitapidocs.com/2022/ab1718f9-45fb-b3d3-827e-32ff81cf929c.htm), para poder trabajar con propiedades y métodos a lo largo de nuestro proyecto.

```csharp
UIApplication uiApp = commandData.Application;
UIDocument uiDoc = uiApp.ActiveUIDocument;
Document doc = uiDoc.Document;
```

Ahora realizaremos la selección de un solo elemento que será el modelo genérico por medio del [**PickObject**](https://www.revitapidocs.com/2022/0315fd62-b533-1817-2f2d-d9ebd4bc8e33.htm), el cual recibe como parámetro el [**ObjectType.Element**](https://www.revitapidocs.com/2022/2d0cbbba-d4ab-84b7-b081-36c14769d82c.htm) y un mensaje para el usuario.

> Nota: Ele método PickObject nos devuelve una Referencia, el cual nos servirá para obtener el Id del Elemento.
>

```csharp
// Seleccionamos el modelo generico
ElementId genericModelElementId = uiDoc.Selection.PickObject(ObjectType.Element, "Seleccione un modelo generico").ElementId;
Element genericModelElement = doc.GetElement(genericModelElementId);
```

Crearemos una condicional donde comprobaremos si la vista actual es diferente de una vista 3D. En caso la vista actual sea diferente a una vista 3D se muestra un mensaje al usuario y se cancela la ejecución del aplicativo, pero si la vista es la correcta nos permita correr el aplicativo.

```csharp
// Comprobamos si estamos en una vista 3D
if (doc.ActiveView.ViewType != ViewType.ThreeD)
   {
      TaskDialog.Show("Error", "Debes estar en una vista 3D");
      return Result.Cancelled;
   }
```

Vamos a generar BoundingBox, el cual se generara desde la vista activa, que servirá para filtrar los elementos que estén dentro. Ahora generaremos un Outline indicándole el punto más bajo izquierda **(bb.Min)** y el punto más alto derecha **(bb.Max)**.

```csharp
// Obtenemos el BoundingBox del Generic Model
BoundingBoxXYZ bb = genericModelElement.get_BoundingBox(doc.ActiveView);
Outline outline = new Outline(bb.Min, bb.Max);
```

Entonces generaremos un BoundingBoxIntersectsFilter, el cual es una regla que filtra los elementos que están dentro de un BoundingBox.

```csharp
 // Regla que filtra los elementos que estan dentro del bounding Box
BoundingBoxIntersectsFilter bbfilter = new BoundingBoxIntersectsFilter(outline);
```

El BoundingBox va a seleccionar todos los elementos que estén dentro de este, incluido el modelo genérico, el cual no sera incluido en nuestro análisis, para eso usaremos el idsExclude de tal manera q excluyamos el modelo genérico.

```csharp
// Lista de elementos que seran excluidos en este caso el generic model
ICollection<ElementId> idsExclude = new List<ElementId>();
idsExclude.Add(genericModelElementId);
```

Ahora filtraremos los elementos a traves del FilteredElementCollector en la vista activa y procederemos a ejecutar el intersectedElements el cual realizará la acción de excluir el modelo genérico de los elementos filtrados y aparte que este dentro del BoundingBox.

```csharp
// Recollectar los elementos que cumplan con la regla
FilteredElementCollector elementInCurrentViewCollector = new FilteredElementCollector(doc, doc.ActiveView.Id);
List<Element> intersectedElements = elementInCurrentViewCollector
                                    .Excluding(idsExclude)
                                    .WherePasses(bbfilter)
                                    .ToList();
```

Para asegurarnos que dentro del modelo genérico hay elementos realizaremos una comprobación, si la cantidad de elementos es igual a cero, se muestra un mensaje al usuario y se cancela la ejecución del aplicativo, caso contrario si es diferente de cero ejecutara el aplicativo.

```csharp
// Comprobar si existen elementos dentro del boundingBox
if (intersectedElements.Count == 0)
{
  TaskDialog.Show("Warning", "No hay elementos dentro del area");
  return Result.Cancelled;
}
```

Luego vamos a general un solido del modelo genérico.

```csharp
// Create solid from generic model
Solid genericModelSolid = GetSolidElement(doc, genericModelElement);

// Metodo para obtener el solido de un elemento
public static Solid GetSolidElement(Document doc, Element el)
{
  Options option = doc.Application.Create.NewGeometryOptions();
  option.ComputeReferences = true;
  option.IncludeNonVisibleObjects = true;
  option.View = doc.ActiveView;

  Solid solid = null;
  GeometryElement geoEle = el.get_Geometry(option) as GeometryElement;
  foreach (GeometryObject gObj in geoEle)
  {
     Solid geoSolid = gObj as Solid;
     if (geoSolid != null && geoSolid.Volume != 0)
     {
        solid = geoSolid;
     }
     else if (gObj is GeometryInstance)
     {
       GeometryInstance geoInst = gObj as GeometryInstance;
       GeometryElement geoElem = geoInst.SymbolGeometry;
       foreach (GeometryObject gObj2 in geoElem)
       {
         Solid geoSolid2 = gObj2 as Solid;
         if (geoSolid2 != null && geoSolid2.Volume != 0)
         {
           solid = geoSolid2;
         }
       }
     }
  }
  return solid;
}
```

```csharp
// Revit API Namespaces
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Selection;

namespace QuantityBox
{
    public class CmdQuantityBox : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData,
                              ref string message,
                              ElementSet elements)
        {

            UIApplication uiApp = commandData.Application;
            UIDocument uiDoc = uiApp.ActiveUIDocument;
            Document doc = uiDoc.Document;

            // Seleccionamos el modelo generico
            ElementId genericModelElementId = uiDoc.Selection.PickObject(ObjectType.Element, "Seleccione un modelo generico").ElementId;
            Element genericModelElement = doc.GetElement(genericModelElementId);

            // Comprobamos si estamos en una vista 3D
            if (doc.ActiveView.ViewType != ViewType.ThreeD)
            {
                TaskDialog.Show("Error", "Debes estar en una vista 3D");
                return Result.Cancelled;
            }

            // Obtenemos el BoundingBox del generic model
            BoundingBoxXYZ bb = genericModelElement.get_BoundingBox(doc.ActiveView);
            Outline outline = new Outline(bb.Min, bb.Max); // Min: Punto mas bajo izquierda - Max: Punto mas alto derecha

            BoundingBoxIntersectsFilter bbfilter = new BoundingBoxIntersectsFilter(outline); // Regla que filtra los elementos que estan dentro del bounding Box

            // Lista de elementos que seran excluidos en este caso el generic model
            ICollection<ElementId> idsExclude = new List<ElementId>();
            idsExclude.Add(genericModelElementId);

            // Recollectar los elementos que cumplan con la regla
            FilteredElementCollector elementInCurrentViewCollector = new FilteredElementCollector(doc, doc.ActiveView.Id);
            List<Element> intersectedElements = elementInCurrentViewCollector
                                                .Excluding(idsExclude)
                                                .WherePasses(bbfilter)
                                                .ToList();

            // Comprobar si existen elementos dentro del boundingBox
            if (intersectedElements.Count == 0)
            {
                TaskDialog.Show("Warning", "No hay elementos dentro del area");
                return Result.Cancelled;
            }
            // Create solid from generic model
            Solid genericModelSolid = GetSolidElement(doc, genericModelElement);

            return Result.Succeeded;
        }
    }
}
```

![3.PNG](/images/posts/cuantificar-por-modelo-generico/3.png)

## Exportación a Excel

Para trabajar con la API de Excel tendremos que agregar una nueva referencia a nuestro proyecto que nos permitirá interactuar con métodos y propiedades de Microsoft Excel..

![4.png](/images/posts/cuantificar-por-modelo-generico/4.png)

Luego agregamos el namespace de excel, usaremos una variable **Excel para que se nos sea más fácil trabajar con los métodos de** Microsoft.Office.Interop.Excel.

```csharp
using Excel = Microsoft.Office.Interop.Excel;
```

Para trabajar con excel primero debemos acceder a la aplicación con el siguiente método.

```csharp
Excel.Application xlApp = new Excel.Application();
```

Una vez ejecutado excel debemos decirle que como voy a crear la aplicación no sea visible y que no muestre ninguna  alerta.

```csharp
xlApp.Visible = false; // Hide Excel Aplication
xlApp.DisplayAlerts = false; // Hide Excel Alert
```

Luego creamos el Workbook y accedemos al Worksheet que vendrían hacer espacio de trabajo y la hoja de excel.

```csharp
Excel.Workbook xlWorkBook = xlApp.Workbooks.Add(Type.Missing); // Create a Workbook
Excel.Worksheet xlWorkSheet = (Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);
```

Definimos una variable entera, rowIndex, que será fila de inicio indicando de donde se proyectara la información extraída.

```csharp
int rowIndex = 4; // row start
```

Mediante foreach, recorremos todos los elementos interceptados para obtener la información de cada uno para exportarlas a Excel.

Haremos los siguientes pasos para esta parte:

1. Obtendremos es el solido del elemento en análisis.
2. Creamos una comprobación si el solido es igual a nulo que continue con el siguiente elemento interceptado.
3. Crearemos un solido, entre el solido del modelo genérico y el solido del elemento en análisis, utilizando el método **BooleanOperationsUtils.ExecuteBooleanOperation** obteniéndolo a traves de **BooleanOperationsType.Intersect.**
4. Creamos una comprobación si existe un solido de la intersección.
5. Calculamos el porcentaje del elemento, comparando el volumen de la parte interceptada versus el volumen total del elemento en análisis.
6. Obtendremos la información de elemento y comparándolo con el porcentaje interceptado, mediante el método getElementInformation.

    ```csharp
    private ElementExport getElementInformation(Element el, double elementPercentage)
    {
       BuiltInCategory category = (BuiltInCategory)el.Category.Id.IntegerValue;

       string elementCategory = el.Category.Name;
       double _lengthQuantity = 1;
       string _sistemType = "No definido";

       switch (category)
       {
         //TUBERIAS
         case BuiltInCategory.OST_PipeCurves:
             _lengthQuantity = el.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH).AsDouble();
             _sistemType = el.get_Parameter(BuiltInParameter.RBS_PIPING_SYSTEM_TYPE_PARAM).AsValueString();
             break;
         //UNIONES DE TUNERIAS
         case BuiltInCategory.OST_PipeFitting:
             _sistemType = el.get_Parameter(BuiltInParameter.RBS_PIPING_SYSTEM_TYPE_PARAM).AsValueString();
             break;
         //APARATOS SANITARIOS
         case BuiltInCategory.OST_PlumbingFixtures:
             _sistemType = el.get_Parameter(BuiltInParameter.RBS_PIPING_SYSTEM_TYPE_PARAM).AsValueString();
             break;
         //DUCTOS
         case BuiltInCategory.OST_DuctCurves:
             _lengthQuantity = el.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH).AsDouble();
             _sistemType = el.get_Parameter(BuiltInParameter.RBS_DUCT_SYSTEM_TYPE_PARAM).AsValueString();
             break;
          //UNIONES DE DUCTOS
          case BuiltInCategory.OST_DuctFitting:
             _sistemType = el.get_Parameter(BuiltInParameter.RBS_DUCT_SYSTEM_TYPE_PARAM).AsValueString();
             break;
          //TERMINALES DE AIRE
          case BuiltInCategory.OST_DuctTerminal:
             _sistemType = el.get_Parameter(BuiltInParameter.RBS_DUCT_SYSTEM_TYPE_PARAM).AsValueString();
             break;
          //EQUIPOS MECANICOS
          case BuiltInCategory.OST_MechanicalEquipment:
             _sistemType = el.get_Parameter(BuiltInParameter.RBS_SYSTEM_CLASSIFICATION_PARAM).AsValueString() != null ? el.get_Parameter(BuiltInParameter.RBS_SYSTEM_CLASSIFICATION_PARAM).AsValueString() : "No definido";
             break;
          //BANDEJAS DE CABLES
          case BuiltInCategory.OST_CableTray:
             _lengthQuantity = el.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH).AsDouble();
             _sistemType = el.LookupParameter("SISTEMA").AsValueString() != null ? el.LookupParameter("SISTEMA").AsValueString()
                                      : el.LookupParameter("SUB-SISTEMA").AsValueString() != null ? el.LookupParameter("SUB-SISTEMA").AsValueString()
                                      : "No definido";
             break;
          //TUBOS
          case BuiltInCategory.OST_Conduit:
              _lengthQuantity = el.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH).AsDouble();
              _sistemType = el.LookupParameter("SISTEMA").AsValueString() != null ? el.LookupParameter("SISTEMA").AsValueString()
                                      : el.LookupParameter("SUB-SISTEMA").AsValueString() != null ? el.LookupParameter("SUB-SISTEMA").AsValueString()
                                      : "No definido";
              break;
          //LUMINARIAS
          case BuiltInCategory.OST_LightingFixtures:
              _sistemType = el.LookupParameter("SISTEMA").AsValueString() != null ? el.LookupParameter("SISTEMA").AsValueString()
                                      : el.LookupParameter("SUB-SISTEMA").AsValueString() != null ? el.LookupParameter("SUB-SISTEMA").AsValueString()
                                      : "No definido";
              break;
          //UNIONES DE BANDEJAS DE CABLES
          case BuiltInCategory.OST_CableTrayFitting:
               _sistemType = el.LookupParameter("SISTEMA").AsValueString() != null ? el.LookupParameter("SISTEMA").AsValueString()
                                      : el.LookupParameter("SUB-SISTEMA").AsValueString() != null ? el.LookupParameter("SUB-SISTEMA").AsValueString()
                                      : "No definido";
               break;
          //UNIONES DE TUBOS
          case BuiltInCategory.OST_ConduitFitting:
                _sistemType = el.LookupParameter("SISTEMA").AsValueString() != null ? el.LookupParameter("SISTEMA").AsValueString()
                                      : el.LookupParameter("SUB-SISTEMA").AsValueString() != null ? el.LookupParameter("SUB-SISTEMA").AsValueString()
                                      : "No definido";
                break;
          //DISPOSITIVOS DE DATOS
          case BuiltInCategory.OST_DataDevices:
                _sistemType = el.LookupParameter("SISTEMA").AsValueString() != null ? el.LookupParameter("SISTEMA").AsValueString()
                                      : el.LookupParameter("SUB-SISTEMA").AsValueString() != null ? el.LookupParameter("SUB-SISTEMA").AsValueString()
                                      : "No definido";
                break;
          //DISPOSITIVOS DE COMUNICACION
          case BuiltInCategory.OST_CommunicationDevices:
                 _sistemType = el.LookupParameter("SISTEMA").AsValueString() != null ? el.LookupParameter("SISTEMA").AsValueString()
                                      : el.LookupParameter("SUB-SISTEMA").AsValueString() != null ? el.LookupParameter("SUB-SISTEMA").AsValueString()
                                      : "No definido";
                  break;
           }

           return new ElementExport(elementCategory, _lengthQuantity.ToString(), _sistemType);
    }
    ```

    Para identificar la categoría de los distintos elementos usamos el BuiltInCategory porque este parámetro es propio de Revit y tendrá un valor único indistintamente si usamos Revit en español, ingles u otro idioma. Para ubicar este parámetro debemos de tener instalado el [RevitLookup](https://github.com/jeremytammik/RevitLookup/releases) y seguir los siguiente pasos.

    ![5.png](/images/posts/cuantificar-por-modelo-generico/5.png)

7. Una vez extraída esta información lo exportaremos a excel con un método externo llamado exportToExcel.

    ```csharp
    private void exportToExcel(Excel.Worksheet xlWorkSheet,
    													 ElementExport elementExport,
    													 int rowIndex)
    {
      xlWorkSheet.Cells[rowIndex, 2] = elementExport.GetCategory();
      xlWorkSheet.Cells[rowIndex, 3] = elementExport.GetQuantity();
      xlWorkSheet.Cells[rowIndex, 4] = elementExport.GetSystem();
    }
    ```

8. Va aumentando el rowIndex++ para q siga la siguiente fila.
9.  por ultimo hacemos que el aplicativo sea visible.

```csharp
foreach (Element intersectedElement in intersectedElements)
{
   Solid intersectedSolid = GetSolidElement(doc, intersectedElement);

    if (intersectedSolid == null) continue; // continuar con el siguiente elemento intersectado en caso no exista solido.
    Solid intersectSolid = BooleanOperationsUtils.ExecuteBooleanOperation(intersectedSolid, genericModelSolid, BooleanOperationsType.Intersect);

    if (intersectSolid == null) continue;
    double solidPercentage = intersectSolid.Volume / intersectedSolid.Volume;
    exportToExcel(xlWorkSheet, getElementInformation(intersectedElement, solidPercentage), rowIndex);
    rowIndex++;
}

xlApp.Visible = true;
```

Definimos una clase ElementExport va a tener 3 propiedades: categoría, cantidad y el sistema, a su vez generamos un constructor, el constructor es el método que se ejecuta apenas cree una nueva variable.

```csharp
public class ElementExport
{
   private string _category;
   private string _quantity;
   private string _system;

   public ElementExport(string category, string quantity, string system)
   {
      this._category = category;
      this._quantity = quantity;
      this._system = system;
   }

   public string GetCategory()
   {
       return _category;
   }

   public string GetQuantity()
   {
       return _quantity;
   }

   public string GetSystem()
   {
        return _system;
   }

}
```

Para ya terminar el aplicativo, nos faltaría agregar el archivo manifiesto

```csharp
<?xml version="1.0" encoding="utf-8" standalone="no"?>
<RevitAddIns>
	<AddIn Type="Command">
		<Assembly>QuantityBox.dll</Assembly>
		<AddInId>ec1d2f17-7d6f-475d-bdf5-ffb2218f0307</AddInId>
		<FullClassName>QuantityBox.CmdQuantityBox</FullClassName>
		<Text>QuantityBox</Text>
		<VendorId>ADSK</VendorId>
		<VendorDescription>Lambda Ingenieria e Innovacion, https://lambda.com.pe</VendorDescription>
		<VisibilityMode>NotVisibleInFamily</VisibilityMode>
		<Discipline>Any</Discipline>
	</AddIn>
</RevitAddIns>
```

Y por ultimo agregaremos a Visual Studio los eventos de compilación, los cuales despues de compilar un addin dentro de Revit, permite compilar los archivos .dll y .addin dentro de una caperta que Revit leera el manifiesto y podra cargar nuestro addin, podemos encontrar estos eventos en el siguiente [link](https://gist.github.com/riverscode/66b6acac8cd453ad8dac6e553fce9f56).

```csharp
copy "$(ProjectDir)*.addin" "$(AppData)\Autodesk\REVIT\Addins\2020"
copy "$(ProjectDir)bin\debug\*.dll" "$(AppData)\Autodesk\REVIT\Addins\2020"
```

**Nota:** Si tienes dudas en los dos últimos pasos los invito a revisar la publicación de [**Mi primer addin con la API de Revit**](https://lambda.com.pe/blog/mi-primer-addin) para entender de manera más clara estos procesos para el aplicativo.

Hasta este puntos hemos culminado con la creación del aplicativo en Visual Studio, solo procederiamos a compilar el aplicativo y hacer uso en el software de Revit.

![6.png](/images/posts/cuantificar-por-modelo-generico/6.png)

Una vez realizado el aplicativo abrimos un proyecto de ejemplo en Revit, nos vamos a la pestaña de complementos/Herramientas externas/QualityBox.

![7.png](/images/posts/cuantificar-por-modelo-generico/7.png)

Como producto final tenemos el metrado o cuantificación de los materiales que estan dentro del modelo generico.

![8.png](/images/posts/cuantificar-por-modelo-generico/8.png)

Por ultimo ya solo quedaria darle formato a la información extraida de manera rapida, eficiente y verídica.

![9.png](/images/posts/cuantificar-por-modelo-generico/9.png)

Y eso es todo. Es un proceso que vale la pena intentarlo y probarlo, sumémonos todos para poder formar una comunidad de personas que tengan las ganas de ingresar a este nuevo mundo de la programación.

Si necesitan más información sobre este increíble mundo de la automatización de procesos a través de la creación de aplicaciones en Autodesk Revit no duden en escribirme a mi LinkedIn [Bryan Espinoza Allcca](https://www.linkedin.com/in/bryan-espinoza-bim/) o dejar comentarios debajo de este post.