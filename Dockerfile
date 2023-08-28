# multi-stage: base (build)
FROM node:18.13.0 AS base

# create directory where the application will be built
WORKDIR /app

# copy over the dependency manifests, both the package.json and the yarn.lock are copied over
COPY package*.json yarn.lock ./

# installs packages and their dependencies using Yarn
RUN yarn install

# copy over the code base
COPY . .

# create the bundle of the application
RUN yarn build

# multi-stage: production (runtime)
FROM node:18.13.0-slim AS production

# create arguments of build time variables
ARG user=pagexa
ARG group=${user}
ARG uid=1001
ARG gid=$uid

# [temporary] work around to be able to run prisma
RUN apt-get update -y && apt-get install -y openssl

# create directory where the application will be executed from
WORKDIR /app

# add the user and group
RUN groupadd --gid ${gid} ${user}
RUN useradd --uid ${uid} --gid ${gid} -m ${user}

# copy over the bundled code from the build stage
COPY --from=base /app/node_modules/ ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/yarn.lock ./yarn.lock
COPY --from=base /app/dist ./dist
COPY --from=base /app/src ./src
COPY --from=base /app/tsconfig* ./

# change ownership of the workspace directory
RUN chown -R ${uid}:${gid} /app/

# get rid of the development dependencies
RUN yarn install --production

# set user to the created non-privileged user
USER ${user}

# expose a specific port on the docker container
ENV PORT=8056
EXPOSE ${PORT}

# start the server using the previously built application
CMD [ "node", "./dist/src/main.js" ]
