
FROM node:latest as build_frontend


WORKDIR /app

#COPY ./frontend/package.json ./frontend/package-lock.json /usr/src/app/

COPY ./frontend .
RUN npm install

RUN npm run build


FROM nginx:latest
COPY --from=build_frontend /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]