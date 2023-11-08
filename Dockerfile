FROM node:20.2.0-bullseye-slim

RUN apt-get update && apt-get install -y git net-tools && rm -rf /var/lib/apt/lists/*

ARG NODE_ENV=development

WORKDIR /usr/local

COPY package.json package-lock.json ./
# install via ci to ensure package-lock.json is used
RUN npm ci 

ENV PATH=/usr/local/node_modules/.bin:$PATH

WORKDIR /usr/local/app

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"] 