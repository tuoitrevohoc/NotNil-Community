FROM ubuntu:14.04
MAINTAINER Daniel <tuoitrevohoc@me.com>

# install curl
RUN apt-get update
RUN apt-get install -y curl wget

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get update
RUN apt-get install -y nodejs build-essential git

# install angular-cli
RUN npm install -g angular-cli

#install swift
RUN apt-get install clang libicu-dev
RUN wget https://swift.org/builds/swift-3.0-preview-1/ubuntu1404/swift-3.0-PREVIEW-1/swift-3.0-PREVIEW-1-ubuntu14.04.tar.gz
RUN tar -xzf swift-3.0-PREVIEW-1-ubuntu14.04.tar.gz
RUN mv swift-3.0-PREVIEW-1-ubuntu14.04 /swift30
RUN export PATH=$PATH:/swift30/usr/bin

#install java
RUN wget http://download.oracle.com/otn-pub/java/jdk/8u91-b14/jdk-8u91-linux-x64.tar.gz
RUN tar -xzf jdk-8u91-linux-x64.tar.gz
RUN mv jdk-8u91-linux-x64 /jdk
RUN export JAVA_HOME=/jdk

#install maven
RUN wget http://www-eu.apache.org/dist/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz
RUN tar -xzf apache-maven-3.3.9-bin.tar.gz
RUN mv apache-maven-3.3.9-bin /maven
RUN export PATH=$PATH:/maven/bin

#get the source code
WORKDIR /app
RUN git clone https://github.com/tuoitrevohoc/NotNil-Community.git
RUN chmod +x ./build-and-run.sh

ENTRYPOINT ./build-and-run.sh



