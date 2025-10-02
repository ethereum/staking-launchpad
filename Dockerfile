FROM node:14.19.2-alpine as builder
WORKDIR /usr/app
RUN apk add --no-cache git python3 make g++
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginxinc/nginx-unprivileged:alpine
WORKDIR /app
COPY --from=builder /usr/app/build/ /app
RUN echo "server { listen 8080; server_name localhost; error_page 404 /index.html; location / { root /app; index index.html; } }" > /etc/nginx/conf.d/default.conf
EXPOSE 8080
