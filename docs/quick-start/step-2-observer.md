#Stats Interpretation (Docker)

##Pre-Requisites

* install docker-compose https://docs.docker.com/compose/install/
* If you want to customize any Kafka parameters, simply add them as environment variables in docker-compose.yml.
* Kafka's log4j usage can be customized by adding environment variables prefixed with LOG4J_.

##Usage

In order to quickly run WebRTC-Observer on a host running Docker and Docker Compose, follow these steps:

1. Clone this repository

`git clone https://github.com/ObserveRTC/docker-webrtc-observer.git`

2. Run

`docker-compose up`

### Hazelcast configuration

The Observer uses hazelcast as an IMDG, and all the configuration related to hazelcast is in hazelcast-config.yml, which is automatically mounted in the docker when you run it.


