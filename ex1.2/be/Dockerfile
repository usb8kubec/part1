FROM node:16-alpine
# Name can edit
WORKDIR /app

COPY ./package.json .
COPY . .

# Run inside IMAGE 
RUN npm install

# Run inside CONTAINER
CMD ["npm","run", "start"]
