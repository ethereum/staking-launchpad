FROM node:14.19.2-alpine
WORKDIR /app
RUN apk add --no-cache git python3 make g++ nginx
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN mkdir /app/build &&\
    chmod 777 /app/build &&\
    chmod -R 777 /var/lib/nginx &&\
    chmod -R 777 /var/log/nginx &&\
    chmod -R 777 /run/nginx
RUN echo "server { listen 8080 default_server; error_page 404 /index.html; location / { root /app/build; index index.html; } }" > /etc/nginx/http.d/default.conf &&\
    echo "#!/bin/sh" > /run.sh &&\
    echo "if [ -f /app/.env ]; then source /app/.env; fi" >> /run.sh &&\
    echo "cd /app && yarn build" >> /run.sh &&\
    echo "if [ ! -f /app/build/index.html ]; then exit 1; fi" >> /run.sh &&\
    echo 'exec nginx -g "daemon off;"' >> /run.sh &&\
    chmod +x /run.sh
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
ENTRYPOINT [ "/run.sh" ]
EXPOSE 8080