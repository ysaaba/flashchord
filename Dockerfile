FROM php:8.1.9-apache

# Install dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install zip

# Enable Apache modules
RUN a2enmod rewrite
RUN a2enmod headers

# Configure PHP
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

# Set working directory
WORKDIR /var/www/html/

# Configure Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html/
RUN chmod -R 755 /var/www/html/
