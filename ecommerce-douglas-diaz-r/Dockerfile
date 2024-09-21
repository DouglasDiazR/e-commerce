FROM node:20.12.2
WORKDIR /app
COPY ecommerce-douglas-diaz-r/package*.json ./ecommerce-douglas-diaz-r/
RUN cd ecommerce-douglas-diaz-r && npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start", "--prefix", "ecommerce-douglas-diaz-r"]
