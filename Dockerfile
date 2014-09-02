FROM ubuntu:14.04

RUN locale-gen en_US.UTF-8
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y --no-install-recommends nodejs npm nodejs-legacy graphicsmagick

ENV PATH node_modules/.bin:$PATH
WORKDIR /opt/

ADD app.js /opt/app.js
ADD package.json /opt/package.json

RUN npm install

ENTRYPOINT ["node", "app.js"]
