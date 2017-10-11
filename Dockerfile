FROM node:8
RUN mkdir -p /usr/src/app/lib && mkdir -p /usr/src/app/static
WORKDIR /usr/src/app
COPY index.js server.js package.json /usr/src/app/
COPY lib/utils.js /usr/src/app/lib/
COPY static/. /usr/src/app/static/
RUN npm install --production
EXPOSE 3000
ENV NODE_ENV production
CMD ["npm", "start"]