##Prerequisites

###Kafka 

We are using Kafka for real-time WebRTC report processing. The WebRTC reports are being forwarded to Kafka for processing to be consumed by the exporter (e.g. Kafka connectors). 

###MySQL 

MySQL is used as a temporary structured storage for aggregating vital information about the call which is distributed among several observer instances. 


##Configuration 

##Configure Kafka and MySQL in the Observer <repo link>

###1. Observer can be setup by using a yaml configuration file for micronaut microservice 

###2. Enter your Kafka configuration

``` python
kafka.bootstrap.servers
```

###3. Enter your MySQL configuration 


``` python
hikari.jdbcUrl
```

###4. Customize your reporting configuration if needed.

##Configure BigQuery in the Exporter <repo link>

###1. Obtain credentials for BigQuery	
###2. Exporter can be setup by using a yaml configuration file for micronaut microservice 
###3. Setup Kafka in configuration
``` python
kafka.bootstrap.servers
```
###4. Setup bigquery credentials in config yaml.

`GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to the obtained credential file

##Deployment  

###Docker

You can use deployment script for docker published here: <github link>

###Kubernetes using HELM 

You can use helm chart for this described here: <github link>

