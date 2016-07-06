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

#install java
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:webupd8team/java
RUN apt-get update

#enable silent install
RUN echo debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections
RUN echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections
RUN apt-get install -y oracle-java8-installer
RUN apt-get install -y oracle-java8-set-default

#install maven
RUN wget http://www-eu.apache.org/dist/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz
RUN tar -xzf apache-maven-3.3.9-bin.tar.gz
RUN mv apache-maven-3.3.9 /maven
RUN export PATH=$PATH:/maven/bin

#install swift
RUN apt-get install -y clang libicu-dev
RUN wget https://swift.org/builds/swift-3.0-preview-1/ubuntu1404/swift-3.0-PREVIEW-1/swift-3.0-PREVIEW-1-ubuntu14.04.tar.gz
RUN tar -xzf swift-3.0-PREVIEW-1-ubuntu14.04.tar.gz
RUN mv swift-3.0-PREVIEW-1-ubuntu14.04 /swift30


#get the source code
RUN git clone https://github.com/tuoitrevohoc/NotNil-Community.git
RUN mv NotNil-Community /app

WORKDIR /app
RUN ./build.sh

ENTRYPOINT ./entry.sh



