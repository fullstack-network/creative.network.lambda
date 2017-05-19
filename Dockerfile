FROM amazonlinux

COPY setup.sh /setup.sh
RUN yum install -y gcc-c++ make
RUN chmod +x /setup.sh
RUN sh /setup.sh
RUN yum install -y nodejs
RUN mkdir -p /build
RUN yum install -y zip
VOLUME /build
WORKDIR /build