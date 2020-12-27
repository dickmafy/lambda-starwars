'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { id, cargo_capacity,consumables,cost_in_credits,created,crew,MGLT} = JSON.parse(event.body);

  const params = {
    TableName: "nave_espacial",
    Item: {
      id: id,
      cargo_capacity: cargo_capacity,
      consumables: consumables,
      cost_in_credits: cost_in_credits,
      created: created,
      crew: crew,
      MGLT: MGLT
    }
  };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch(err) {
    responseBody = `Error al insertar una nave espacial: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};