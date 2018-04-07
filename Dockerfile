FROM diko316/alnode:v2.2

ADD . $PROJECT_ROOT

RUN rm -Rf node_modules package-lock.json && \
    npm install -y -dd

ENTRYPOINT [ "bin/run.sh" ]
