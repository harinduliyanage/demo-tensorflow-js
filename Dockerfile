# base image
FROM node:12.2.0

# set working directory
WORKDIR /app
COPY . .

# install and cache app dependencies
RUN npm install
RUN npm install -g @angular/cli@7.3.9


# start app
CMD ng serve --host 0.0.0.0

EXPOSE 4200
