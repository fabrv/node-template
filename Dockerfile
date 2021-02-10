#
#
# THIS DOCKERFILE IS THE BASE IMAGE FOR CREATE A CONTAINERS FOR JAVA WEB USING TOMCAT 8.5.35 AND JRE 8 IN ALPINE  LINUX
# CREATED 11/25/2019
# BY: LISANDRO RAFAELANO
#
# gcloud builds submit -t gcr.io/ti-is-devenv-01/is-glogger-audit:v1 --gcs-log-dir=gs://ti-is-devenv-01_cloudbuild_custom_logs_cicd/logs/ .
# gcloud builds submit -t gcr.io/ti-is-devenv-01/is-glogger-audit:v1 --gcs-log-dir=gs://ti-is-devenv-01_cloudbuild_custom_logs_cicd/logs/ .

#FROM gcr.io/ti-is-prodenv-01/node-10:v1
FROM gcr.io/ti-is-prodenv-01/is-node-12:v1
#FROM node:12

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY app-code/ .

RUN npm install

CMD [ "node","--max-old-space-size=1024",  "dist" ]

EXPOSE 443


