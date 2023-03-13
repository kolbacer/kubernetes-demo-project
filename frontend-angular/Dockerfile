# base image
FROM node:18.15-alpine3.16

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV API_BASEURL="http://localhost"
ENV API_PORT="3000"

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@13.3.0

# Bundle app source
COPY . /app

# start app
CMD ng serve --host=0.0.0.0 --configuration=production
