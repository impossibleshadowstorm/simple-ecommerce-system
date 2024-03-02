FROM node:20.10.0

ADD . /backend/

WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH
ENV NODE_PATH /backend/node_modules
VOLUME $NODE_PATH

# COPY package.json .
COPY package.json /backend/package.json
RUN yarn

# COPY . .

EXPOSE 8001

CMD ["npm", "run", "dev"]