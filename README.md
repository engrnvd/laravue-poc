## Run the project

    docker-compose up -d

or

    docker compose up -d

whatever works

If you made any changes to the docker related files, run:

    docker-compose up --build -d

## To execute commands on the container:

    docker exec -it sp2-api-laravel.app-1 php artisan 

or

    ./vendor/bin/sail up

or create an alias for sail by adding this to your `.bashrc` or `.zshrc`:

    alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'

and then you can simply run `sail artisan`

All commands here: https://laravel.com/docs/9.x/sail#executing-sail-commands


