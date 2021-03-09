FROM node:12

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 4200

CMD [ "npm","start"]

# FROM node:latest AS node

# WORKDIR /app
# COPY . .
# RUN npm install
# EXPOSE 8080
# RUN npm run build --prod --aot

# FROM nginx:alpine
# COPY --from=node /app/dist/ecommerceApp /usr/share/nginx/html
