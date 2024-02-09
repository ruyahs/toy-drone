FROM node:alpine as build
RUN mkdir -p /app
RUN npm cache clear --force
WORKDIR /app
COPY package.json /app
COPY . /app
RUN npm install
COPY . /app
RUN npm run build 

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]