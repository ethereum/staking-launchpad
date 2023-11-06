FROM node:18

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY . .

RUN yarn

CMD [ "yarn", "start" ]