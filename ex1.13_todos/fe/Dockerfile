FROM node:16-alpine3.14 as build-stage

WORKDIR /app

COPY package* .

RUN npm ci

COPY . .

RUN npm run build

# -------------------------------------------------------
FROM node:16-alpine3.14

ENV PORT 3000

RUN npm install -g serve

# COPY --from=build-stage /app/build /usr/src/html
COPY --from=build-stage /app/build .

# CMD serve -l $PORT /usr/src/html
CMD serve -l $PORT