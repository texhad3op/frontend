# # 1 working
# FROM nginx:latest
# COPY ./index.html /usr/share/nginx/html/index.html

FROM nginx:latest
COPY ./dist/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
