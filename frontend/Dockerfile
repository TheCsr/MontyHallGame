FROM node:14-slim

WORKDIR /app

COPY package.json .

RUN npm install @mui/material @emotion/react @emotion/styled redux react-redux redux-thunk

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]





