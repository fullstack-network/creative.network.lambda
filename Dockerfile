FROM amazonlinux

COPY setup.sh /setup.sh
RUN yum install -y gcc-c++ make
RUN chmod +x /setup.sh
RUN sh /setup.sh
RUN yum install -y nodejs