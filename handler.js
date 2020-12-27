'use strict';
const AWS = require('aws-sdk');
const swapi = require('swapi-node');
AWS.config.update({ region: 'sa-east-1' })
//const TABLE_NAME = process.env.TABLE_NAME
const TABLE_NAME_TEXTO = "thekittens-crud-kittens-dev"

module.exports = {

  create: async (event, context) => {
    let objeto = {}
    try {
      objeto = JSON.parse(event.body)
    } catch (jsonError) {
      console.log('There was an error parsing the body', jsonError)
      return {
        messageTitulo: ">>Error al Crear-try",
        message1: jsonError,
        statusCode: 400
      }
    }

    if (typeof objeto.nombre === 'undefined') {
      console.log('Faltan parametros en CREATE')
      return {
        messageTitulo: ">>Error al Crear-bodyObj",
        message1: objeto,
        statusCode: 400
      }
    }

    let putParams = {
      TableName: TABLE_NAME_TEXTO,
      Item: {
        nombre: objeto.nombre,
        altura: objeto.altura,
        colorPelo: objeto.colorPelo,
        colorPiel: objeto.colorPiel,
        colorOjo: objeto.colorOjo,
        anioNacimiento: objeto.anioNacimiento,
        genero: objeto.genero,
        mundoHogar: objeto.mundoHogar,
        creado: objeto.creado,
        editado: objeto.editado,

      }
    }

    let putResults = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      putResults = await dynamodb.put(putParams).promise()

    } catch (putError) {
      console.log('Error en CREAR -deleteparams')
      console.log('putParams', putParams)
      return {
        messageTitulo: ">>Error al Crear - putParams",
        message1: putParams,
        statusCode: 500
      }
    }

    return {
      putResults: putResults,
      putParams: putParams,
      statusCode: 201
    }

  },



  delete: async (event, context) => {

    let objeto = {}
    let resultadoBorrado = ""

    try {
      objeto = JSON.parse(event.body)
    } catch (jsonError) {
      console.log('Error en DELETE', jsonError)
      return {
        messageTitulo: "Error al DELETE-try",
        bodyObj: objeto,
        message1: jsonError,
        statusCode: 400
      }
    }


    if (typeof objeto.nombre === 'undefined') {
      console.log('Faltan parametros en DELETE')
      return {
        messageTitulo: "Error al DELETE-bodyObj",
        message1: objeto,
        statusCode: 400
      }
    }



    let deleteParams = {
      TableName: TABLE_NAME_TEXTO,
      Key: {
        nombre: objeto.nombre
      },
      ReturnValues: "ALL_OLD",
      Exists: true
    }

    let putResults = {}
    try {

      let dynamodb = new AWS.DynamoDB.DocumentClient()
      putResults = await dynamodb.delete(deleteParams).promise();

    } catch (deleteError) {
      console.log("Problema ejecutando DELETE");
      console.log("ERROR DELETE : ", deleteError);
      return {
        deleteParams: deleteParams,
        deleteError: deleteError,
        statusCode: 500
      };
    }

    return {
      "isBase64Encoded": false,
      "statusCode": 200,
      "body": {
        "message": "Successful response",
        "bodyObj": JSON.stringify(objeto),
        "resultadoBorrado": JSON.stringify(resultadoBorrado),
        "deleteParams": JSON.stringify(deleteParams)
      },
      "headers": {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": true,
        'Content-Type': 'application/json',
      },

    }



  },



  update: async (event, context) => {

    let objeto = {}
    try {
      objeto = JSON.parse(event.body)
    } catch (jsonError) {
      console.log('Error en parametro de Update', jsonError)
      return {
        statusCode: 400
      }
    }

    if (typeof objeto.nombre === 'undefined') {
      console.log('Error en update - falta parametro')
      return {
        bodyObj: objeto,
        statusCode: 400
      }
    }

    let updateParams = {
      TableName: TABLE_NAME_TEXTO,
      Key: {
        nombre: objeto.nombre
      },
      UpdateExpression: "set altura = :altura,colorPelo =:colorPelo",
      /* ExpressionAttributeName: {
         ':age': 'age'
       },*/
      ExpressionAttributeValues: {
        ':altura': objeto.altura,
        ':colorPelo': objeto.colorPelo,
      }
    }

    let putResults = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      putResults = await dynamodb.update(updateParams).promise()

    } catch (updateError) {
      console.log("Error Actualizando - updateError");
      return {
        titulo: "Terminando..",
        updateParams: updateParams,
        bodyObj: objeto,
        updateError: updateError,
        statusCode: 500
      };
    }

    return {
      titulo: "Terminando..",
      putResults: putResults,
      updateParams: updateParams,
      bodyObj: objeto,
      statusCode: 200,
    };




  },



  list: async (event, context) => {
    let scanParams = {
      //TableName: process.env.DYNAMODB_KITTEN_TABLE
      TableName: TABLE_NAME_TEXTO

    }
    let scanResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      scanResult = await dynamodb.scan(scanParams).promise()


    } catch (scanError) {
      console.log("scanError", scanError);
      return {
        message: "Error en Listar - scanError",
        scanError: scanError,
        message2: scanParams,
        statusCode: 500
      };
    }

    if (scanResult.Items === null ||
      !Array.isArray(scanResult.Items) ||
      scanResult.Items.length === 0) {
      return {
        message: ">>> Lista vacia - scanResult",
        message2: scanResult.Items,
        message3: scanResult,
        statusCode: 404
      };
    }


    return {
      statusCode: 200,
      body: JSON.stringify(scanResult.Items.map(item => {
        return {
          nombre: item.nombre,
          altura: item.altura,
          colorPelo: item.colorPelo,
          colorPiel: item.colorPiel,
          colorOjo: item.colorOjo,
          anioNacimiento: item.anioNacimiento,
          genero: item.genero,
          mundoHogar: item.mundoHogar,
          creado: item.creado,
          editado: item.editado
        };
      }))
    };

  },



  version: async (event, context) => {
    //JSON.stringify
    //JSON.parse
    return {
      statusCode: 200,
      response: JSON.stringify('Hello from Lambda version 1.8'),
    }

  },

  swapi: async (event, context) => {

    let respuestaDentroForAwait = {}
    let respuestaAwayById = "";
    let respuestAwaitGet = "";
    let respuestaAwaitGetAll = "";
    try {
      //respuestaAwayById = await swapi.getPerson({ id: 1 });
      respuestaAwaitGetAll = await swapi.getPerson();
      respuestaAwaitGetAll.results.forEach((movies) => {
        console.log(movies.name);
        savePeopleSwapi(movies);
      });

    } catch (error) {
      console.log('error return' + error);
    }
    /*  await swapi.get('https://swapi.dev/api/people').then((result) => {
        console.log("#LOGGGGGGGGGGGGG");
        //console.log(result);
        respuestaDentroForAwait = result
      });
      */
    //respuestAwaitGet = await swapi.get('https://swapi.dev/api/people');

    return {
      response: JSON.stringify('Hello from Lambda version 1.8'),
      message: "ok",
      //mensaje10: respuestaAwayById,
      swapiPersonajes: respuestAwaitGet,
      //message1: respuestaDentroForAwait,
      statusCode: 200
    };
  },


};

function savePeopleSwapi(event) {
  console.log("### Ingresando a savePeopleSwapi");


  let objeto = {}
  try {
    objeto = event
  } catch (jsonError) {
    console.log('savePeopleSwapi - error en la parametria', jsonError)
    return {
      messageTitulo: "savePeopleSwapi - Error al Crear-try",
      message1: jsonError,
      statusCode: 400
    }
  }

  if (typeof objeto.name === 'undefined') {
    console.log('savePeopleSwapi - Faltan parametros en CREATE')
    return {
      messageTitulo: "savePeopleSwapi - Error al Crear - Objeto",
      message1: objeto,
      statusCode: 400
    }
  }

  let putParams = {
    TableName: TABLE_NAME_TEXTO,
    Item: {
      nombre: objeto.name,
      altura: objeto.height,
      colorPelo: objeto.hair_color,
      colorPiel: objeto.skin_color,
      colorOjo: objeto.eye_color,
      anioNacimiento: objeto.birth_year,
      genero: objeto.gender,
      mundoHogar: objeto.homeworld,
      creado: objeto.created,
      editado: objeto.edited

    }
  }

  let putResults = {}
  try {
    let dynamodb = new AWS.DynamoDB.DocumentClient()
    putResults = dynamodb.put(putParams).promise()

  } catch (putError) {
    console.log('savePeopleSwapi - Error en CREAR - putParams')
    return {
      messageTitulo: "savePeopleSwapi - Error al Crear - putParams",
      message1: putParams,
      statusCode: 500
    }
  }

  return {
    putResults: putResults,
    putParams: putParams,
    statusCode: 201
  }



}