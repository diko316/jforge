FROM diko316/alnode:v2.2

ENV PLAYGROUND=/opt/playground

ADD . $PROJECT_ROOT

RUN cd $PROJECT_ROOT && \
    mkdir $PLAYGROUND && \
    ln -s $PROJECT_ROOT/bin/dev-install.sh /usr/local/bin/dev-install && \
    cd core && \
    npm install -y -dd

ENTRYPOINT [ "/opt/app/bin/run.sh" ]

WORKDIR $PLAYGROUND

