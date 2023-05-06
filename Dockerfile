# Pull Alpine Linux Image
FROM alpine:latest

# Creating and setting app dir
RUN mkdir /n-pos
WORKDIR /n-pos

# Copy all elements to the image see .dockerignore
COPY . .

# Installing nodejs
RUN apk add --update nodejs npm

# Exposing app port
EXPOSE 5001

# Install dependencies and start the app
ENTRYPOINT [ "sh", "-c" ]
CMD [ "npm install && npm run start" ]
