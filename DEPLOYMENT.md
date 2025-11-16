# GitHub CI/CD Deployment Guide

Этот проект настроен для автоматического развертывания на удаленный сервер при пуше в ветку `main`.

## Настройка GitHub Secrets

Перейдите в настройки репозитория: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Добавьте следующие секреты:

### 1. REMOTE_HOST
IP-адрес или домен вашего удаленного сервера.

**Пример:** `176.212.34.192` или `example.com`

### 2. REMOTE_USER
Имя пользователя для SSH подключения к серверу.

**Пример:** `ubuntu` или `root`

### 3. REMOTE_PORT
Порт SSH (обычно 22).

**Пример:** `22`

### 4. SSH_PRIVATE_KEY
Приватный SSH ключ для подключения к серверу.

**Как получить:**
```bash
# На вашем локальном компьютере или сервере GitHub Actions
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Скопируйте публичный ключ на удаленный сервер
ssh-copy-id -i ~/.ssh/id_rsa.pub user@your-server

# Скопируйте содержимое приватного ключа
cat ~/.ssh/id_rsa
```

Скопируйте весь вывод (включая `-----BEGIN OPENSSH PRIVATE KEY-----` и `-----END OPENSSH PRIVATE KEY-----`) и вставьте в GitHub Secret.

### 5. DJANGO_SECRET_KEY
Секретный ключ Django для production.

**Как сгенерировать:**
```bash
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

### 6. ALLOWED_HOSTS
Список разрешенных хостов через запятую.

**Пример:** `example.com,www.example.com,176.212.34.192`

## Подготовка удаленного сервера

На вашем удаленном сервере должны быть установлены:

1. **Docker:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

2. **Docker Compose:**
```bash
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

3. **Разрешите SSH подключения** (обычно порт 22)

## Процесс развертывания

При каждом пуше в ветку `main` GitHub Actions автоматически:

1. Соберет Docker образ
2. Скопирует образ на удаленный сервер
3. Загрузит образ в Docker на сервере
4. Остановит старые контейнеры
5. Запустит новые контейнеры
6. Выполнит миграции базы данных
7. Соберет статические файлы
8. Проверит статус развертывания

## Локальное тестирование

Перед пушем в GitHub протестируйте Docker локально:

```bash
# Создайте .env файл
cat > .env << EOF
SECRET_KEY=your-local-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
EOF

# Соберите и запустите контейнеры
docker compose up --build

# Откройте браузер: http://localhost:8000
```

## Проверка логов на сервере

Подключитесь к серверу и проверьте логи:

```bash
ssh user@your-server
cd ~/cybermisha-app
docker compose logs -f
```

## Ручной запуск workflow

Вы также можете запустить деплой вручную:
1. Перейдите в раздел `Actions` в GitHub
2. Выберите `Build and Deploy Docker Container`
3. Нажмите `Run workflow`

## Откат к предыдущей версии

Если что-то пошло не так:

```bash
ssh user@your-server
cd ~/cybermisha-app

# Посмотрите доступные образы
docker images | grep cybermisha

# Откатитесь к предыдущему образу
# Отредактируйте docker-compose.yml и укажите нужный тег
docker compose up -d
```

## Структура на сервере

После деплоя на сервере будет:
- `~/cybermisha-app/` - директория приложения
- `~/cybermisha-app/docker-compose.yml` - конфигурация Docker Compose
- `~/cybermisha-app/.env` - переменные окружения
