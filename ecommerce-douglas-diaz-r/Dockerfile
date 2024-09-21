FROM node:20.12.2
WORKDIR /app
COPY package*.json ./
RUN cd ecommerce-douglas-diaz-r && npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]
