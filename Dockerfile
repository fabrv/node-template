FROM node:14.15.5-alpine3.10
# App directory
WORKDIR /usr/src/app

# Copy depency information
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
# Compile the typescript
RUN npm run build

# Run application and expose port
EXPOSE 8080
CMD [ "node", "./dist" ]