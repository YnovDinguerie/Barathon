# Project Setup
composer install
cp .env.example .env
php artisan key:generate

Create database.sqlite in /database/

php artisan migrate:fresh


# Generate swagger
php artisan l5-swagger:generate
