# Stage 1
FROM node:22-alpine AS node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install bun
COPY . .
RUN npm run build-prod

# Stage 2
FROM nginx:1.21.6-alpine
COPY --from=node /usr/src/app/dist/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
