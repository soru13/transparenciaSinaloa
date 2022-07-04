#!/bin/sh
PATH_API=/app
PATH_NODEMODULES=${PATH_API}/node_modules

if [ ! -d "${PATH_NODEMODULES}" ]; then
    npm install --prefix=${PATH_API}
fi

if [ "${ENV}" = "prod" ]; then
    echo "entramos a produccion"
    npm run dll --prefix=${PATH_API}
fi

# start service in background here
NODE_ENV=${ENV} npm run "${ENV}" --prefix=${PATH_API}

echo "[hit enter key to exit] or run 'docker stop <container>'"

# stop service and clean up here
echo "stopping service"
# kill -9 1

echo "exited $0"