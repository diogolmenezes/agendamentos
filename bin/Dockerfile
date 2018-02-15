FROM node:6
MAINTAINER diogo.leitao@oi.net.br

USER root

# install packages
RUN apt-get update \
   && apt-get install -y nodejs-legacy npm curl

# configure npm on nexus cache repository
RUN npm config set registry http://dadhx05.interno:8081/repository/npm-group/

# set default workdir
RUN mkdir -p /usr/src/atendimento-backend
WORKDIR /usr/src/atendimento-backend

# install app dependencies
COPY package.json /usr/src/atendimento-backend/
RUN if $http_proxy; then npm config set proxy=$http_proxy; fi
RUN if $http_proxy; then npm config set https-proxy=$http_proxy; fi
RUN if $http_proxy; then npm config set strict_ssl false; fi
RUN npm install

# bundle app source
COPY . /usr/src/atendimento-backend/

# expose app port and run
EXPOSE 8090

CMD ["node", "app"]