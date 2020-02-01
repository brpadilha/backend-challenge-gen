FROM node:10-slim

WORKDIR /app

COPY package.json /app

RUN  yarn && yarn cache clean

COPY .  .

COPY --chown=node:node . .

USER node

EXPOSE 3333

VOLUME [ "/app" ]

CMD [ "yarn", "start" ]
