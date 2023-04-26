FROM alpine:latest

RUN mkdir /n-pos
WORKDIR /n-pos

COPY . .

RUN apk add --update nodejs npm

EXPOSE 5001

ENTRYPOINT [ "sh", "-c" ]
CMD [ "npm install && npm run start" ]
