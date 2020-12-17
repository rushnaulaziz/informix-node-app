### [INFORMIX_NODE_UTILITY](https://github.com/rushnaulaziz/informix-node-app)

A NodeJs Application for integrating IBM Informix Database 

#### Project Description

To connect the informix database we have used the npm package [informixdb](https://www.npmjs.com/package/informixdb). 

Before running the application you must have following setups:
1. install Informix Client Sofware Development Kit(CSDK) version 4.10xC2 or greater.
2. Configure the Environment Variables **CSDK_HOME**,**DB_LOCALE** and **LD_LIBRARY_PATH** w.r.t CSDK path. for example: 
if your CSDK is installed on "/opt/IBM/Informix_Client-SDK" path then;
- CSDK_HOME="/opt/IBM/Informix_Client-SDK"
- DB_LOCALE="en_US.UTF8"
- LD_LIBRARY_PATH=/opt/IBM/Informix_Client-SDK/lib:/opt/IBM/Informix_Client-SDK/lib/esql:/opt/IBM/Informix_Client-SDK/lib/cli

#### Get Started
1. run npm install
2. npm start
3. The application will be started on port [3000](http://localhost:3000)


