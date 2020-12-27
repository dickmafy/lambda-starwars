# tutorial
https://dev.to/sagar/build-a-restful-api-with-the-serverless-framework-ene

# en una carpeta vacia

npm init -f

npm install -g serverless

serverless create --template aws-nodejs --name serverless-rest-api --path serverless-rest-api

# instalar aws
npm install --save aws-sdk uuid
# instalar parametros globales
npm install serverless-pseudo-parameters

serverless deploy --aws-profile serverless --stage dev 
serverless deploy --aws-profile default --stage dev 

# download profiles
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/



# deploy localmente
serverless invoke local --function hello
serverless invoke local --function version


# URLS
C:\Users\pcdiego\Desktop\serverless\serverless_framework_demo1\serverless-rest-api>serverless deploy --aws-profile default --stage dev
Serverless: Configuration warning at root: unrecognized property 'environment'
Serverless:  
Serverless: Learn more about configuration validation here: http://slss.io/configuration-validation
Serverless:  
Serverless: Deprecation warning: Starting with next major version, API Gateway naming will be changed from "{stage}-{service}" to "{service}-{stage}".
            Set "provider.apiGateway.shouldStartNameWithService" to "true" to adapt to the new behavior now.
            More Info: https://www.serverless.com/framework/docs/deprecations/#AWS_API_GATEWAY_NAME_STARTING_WITH_SERVICE
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service thekittens-crud.zip file to S3 (9.94 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
........................................................................................................................
Serverless: Stack update finished...
Service Information
service: thekittens-crud
stage: dev
region: sa-east-1
stack: thekittens-crud-dev
resources: 41
api keys:
  None
endpoints:
  POST - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten
  GET - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten
  GET - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten/{name}      
  GET - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten/{name}      
  GET - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten
  GET - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten/version     
functions:
  create: thekittens-crud-dev-create
  list: thekittens-crud-dev-list
  get: thekittens-crud-dev-get
  update: thekittens-crud-dev-update
  delete: thekittens-crud-dev-delete
  hello: thekittens-crud-dev-hello
layers:
  None

# Example de Endpoints url
 POST - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten
 {
   "name" : "fluffykins",
    "age": 33

 }
  GET - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten
  GET - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten/{name}      
  GET - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten/{name}      
  GET - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten
  GET - https://yd35bzjglj.execute-api.sa-east-1.amazonaws.com/dev/v1/kitten/version     






# rol
thekittens-crud-dev-sa-east-1-lambdaRole

# rol anr
arn:aws:iam::733926286261:role/thekittens-crud-dev-sa-east-1-lambdaRole

# politica
thekittens-crud-dev-lambda

thekittens-politica
accesos a la bd dynamo













