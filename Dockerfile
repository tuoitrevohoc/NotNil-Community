FROM frolvlad/alpine-oraclejdk8:slim
MAINTAINER Daniel <tuoitrevohoc@me.com>

# install curl
RUN apt-get update
RUN apt-get install -y curl wget

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get update
RUN apt-get install -y nodejs build-essential git

# install angular-cli
RUN npm install angular-cli
RUN npm install typings
RUN npm install typescript

#install swift
RUN apt-get install clang libicu-dev
RUN wget https://swift.org/builds/swift-3.0-preview-1/ubuntu1404/swift-3.0-PREVIEW-1/swift-3.0-PREVIEW-1-ubuntu14.04.tar.gz
RUN tar -xzf swift-3.0-PREVIEW-1-ubuntu14.04.tar.gz
RUN mv swift-3.0-PREVIEW-1-ubuntu14.04.tar /swift30
RUN export PATH=$PATH:/swift30/usr/bin

#get the source code
WORKDIR /app
RUN git clone https://github.com/tuoitrevohoc/NotNil-Community.git
RUN chmod +x ./build-and-run.sh

ENTRYPOINT ./build-and-run.sh



