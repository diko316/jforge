FROM diko316/alnode

ADD . $PROJECT_ROOT

RUN rm -Rf node_modules package-lock.json && \
    npm install -y -dd
