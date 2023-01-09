## Run the project:

`yarn start` in frontend folder

`docker-compose up` in backend folder

## Authentication

Does not implement authentication on it's own, frontend could be e.g. injected to exiting frontend. Currently uses mocked jwt in `frontend/lib/api`, change to other token in order to mimic different user.

## TODOs

- Better error handling & communicating errors to user
- Better loading indicators & progress bars
- Authentication
- Sharing files to other users
