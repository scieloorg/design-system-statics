FROM nginx:latest
COPY css /www/data/static/css
COPY img /www/data/static/img
COPY js /www/data/static/js
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]