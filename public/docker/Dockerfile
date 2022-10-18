FROM node:16.13-alpine

RUN apk update
RUN apk add bash
RUN apk add tzdata && \
    # This is for setting your docker timezone
    cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime && \
    echo "Asia/Bangkok" > /etc/timezone && \
    date
    
WORKDIR /app
EXPOSE 3000

COPY package.json /app
RUN npm install
COPY .env /app
COPY ./dist /app/.
CMD [ "node", "index.js" ]
