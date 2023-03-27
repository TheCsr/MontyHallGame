FROM node:14-slim

WORKDIR /app

COPY . .

RUN npm install @mui/material @emotion/react @emotion/styled redux react-redux redux-thunk

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]





