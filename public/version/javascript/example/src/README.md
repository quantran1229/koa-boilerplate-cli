# Source code

## Folders structure:

- **constants**: Save all constants to use. If constants is change between server(local/dev/prod) move constants to `.env` instead.
- **controllers**: All controller to deal with backend logic.
- **cronjobs**: To run cronjob srcipt.
- **keys**: mostly use for `JWT` encode/decode.
- **middleware**: to store middleware functions.
- **models**: to store connection to db + db schema.
- **routes**: to store API route to call.
- **script**: script for cronjob or to run alone.
- **service**: service to use like get/set/delete models.
- **utils**: to save all util functions.
- **public**: to save static file like email template.
- `index.js`: main file for koa.

## How to debug:

- Check logs.
- Go to `/routes` to get route.
- Go to `/controllers` to get controller.
- Go to `/services` to get service(logic).
- Go to `/models` to get model to db.
