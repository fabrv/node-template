FROM node:14
# App directory
WORKDIR /usr/src/app

# Copy depency information
COPY package*.json ./
RUN npm install
RUN npm run build

# Bundle app source
COPY . .

# Run application and expose port
EXPOSE 8080
CMD [ "node", "./dist" ]