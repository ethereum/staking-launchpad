FROM node:lts AS build-env
ADD . /src
WORKDIR /src
RUN yarn install && yarn build

FROM node:lts
WORKDIR /app
RUN npm install -g serve
COPY --from=build-env /src/build /app/
CMD ["serve", "-l", "8080", "-n"]
