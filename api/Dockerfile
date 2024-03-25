FROM node:18.17.1

COPY . .

COPY ./ package*.json  

RUN npm i -g --exitcrash nodemon

WORKDIR /usr/scr/app/api


EXPOSE 3000
# ENV PORT 3000

CMD [ "npm", "start" ]