FROM mysql:8.0

ENV MYSQL_DATABASE=shoponline
ENV MYSQL_ROOT_PASSWORD=123456

COPY ./init.sql /docker-entrypoint-initdb.d/init.sql
