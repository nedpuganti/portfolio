# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.205.2/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 16, 14, 12, 16-bullseye, 14-bullseye, 12-bullseye, 16-buster, 14-buster, 12-buster
ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# USER root

RUN su node -c "npm install -g @angular/cli npm"

EXPOSE 4000 4200 8080 3000 443 80 22

##################################
#Install Prerequisites
RUN apt-get update
RUN apt-get install -y \
    lsb-release \
    curl \
    git
