# LaraVue Test

## About

This project is a template based on Laravel and Vue.
This particular project is intended to be a demo for a job on Upwork.
The main purpose of the project is to showcase my skills, including but not limited to:

- Laravel
- Vue.js
- MySQL
- Docker
- Rest APIs
- Token-based authentication
- CI/CD using GitHub actions
- Automated end-to-end testing using Cypress

Instead of a standard Breeze installation, the project is set up specifically to showcase these skills / technologies.

## Run the project

    docker-compose up -d

or

    docker compose up -d

whatever works

If you make any changes to the docker related files, run:

    docker-compose up --build -d

Then run the frontend

    cd frontend
    npm install
    npm run dev

## To execute commands on the container:

    docker exec -it sp2-api-laravel.app-1 php artisan 

or

    ./vendor/bin/sail up

or create an alias for sail by adding this to your `.bashrc` or `.zshrc`:

    alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'

and then you can simply run `sail artisan`

All commands here: https://laravel.com/docs/9.x/sail#executing-sail-commands


