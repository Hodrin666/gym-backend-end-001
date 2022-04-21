FROM node:14-alpine AS base

# Switch to user `node`. Everything will now be done under this user.
USER node

# Create working directory.
RUN mkdir /home/node/app
WORKDIR /home/node/app

FROM base AS yarn-dependencies

# Install dependencies.
COPY --chown=node:node package.json yarn.lock /home/node/app/
RUN yarn install --force

# Bundle application.
COPY --chown=node:node . ./
RUN NODE_ENV=production yarn build

FROM base AS build-dist

# Copy bundle folder.
COPY --chown=node:node --from=yarn-dependencies /home/node/app /home/node/app

# Run server.
CMD yarn start:prod --port ${SERVER_PORT:-4000}
