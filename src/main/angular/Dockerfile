FROM nginx
MAINTAINER Daniel <tuoitrevohoc@me.com>

# install curl
RUN apt-get update
RUN apt-get install -y curl wget

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs build-essential git

# install angular-cli
RUN npm install -g angular-cli

#get the source code
RUN ls
RUN git clone https://github.com/tuoitrevohoc/NotNil-Community.git
RUN mv NotNil-Community /app

WORKDIR /app/src/main/angular
RUN ./build.sh

ENTRYPOINT ./entry.sh



