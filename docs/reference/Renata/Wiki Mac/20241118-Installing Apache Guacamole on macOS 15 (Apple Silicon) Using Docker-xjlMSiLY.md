# Installing Apache Guacamole on macOS 15 (Apple Silicon) Using Docker

## **Prerequisites**

1. **Install Docker Desktop**:

   - Install Docker via Homebrew:
     ```bash
     brew install --cask docker
     ```
   - Open Docker Desktop and ensure it is running.

2. **Enable Rosetta for x86/amd64 Emulation** (Optional):

   - Open Docker Desktop settings.
   - Go to **Settings > Features in Development** and enable:
     - **Use Rosetta for x86/amd64 emulation on Apple Silicon.**

3. **Download Guacamole JDBC Authentication Files**:
   - Download the JDBC files for MySQL from the [official Apache Guacamole website](https://guacamole.apache.org/):
     ```bash
     curl -O https://downloads.apache.org/guacamole/1.5.3/binary/guacamole-auth-jdbc-1.5.3.tar.gz
     ```
   - Extract the archive:
     ```bash
     tar -xzf guacamole-auth-jdbc-1.5.3.tar.gz
     ```

---

## **Steps to Set Up Guacamole**

### 1. **Start MySQL Database**

- Pull and run the MySQL Docker image for `linux/amd64`:
  ```bash
  docker run --platform linux/amd64 --name guac-mysql -e MYSQL_ROOT_PASSWORD=rootpass -e MYSQL_DATABASE=guacamole -d mysql:8
  ```

### 2. **Prepare the MySQL Database Schema**

- Copy the Guacamole schema files into the MySQL container:

  ```bash
  docker cp guacamole-auth-jdbc-1.5.3/mysql/schema/001-create-schema.sql guac-mysql:/001-create-schema.sql
  docker cp guacamole-auth-jdbc-1.5.3/mysql/schema/002-create-admin-user.sql guac-mysql:/002-create-admin-user.sql
  ```

- Access the MySQL container:

  ```bash
  docker exec -it guac-mysql bash
  ```

- Inside the container, apply the schema files:

  ```bash
  mysql -uroot -prootpass guacamole < /001-create-schema.sql
  mysql -uroot -prootpass guacamole < /002-create-admin-user.sql
  ```

- **Note**: Ignore the warning:

  ```
  mysql: [Warning] Using a password on the command line interface can be insecure.
  ```

- Exit the container:
  ```bash
  exit
  ```

---

### 3. **Start the Guacamole Server (guacd)**

- Pull and run the Guacamole server container:
  ```bash
  docker run --platform linux/amd64 -d --name guacd -p 4822:4822 guacamole/guacd
  ```

---

### 4. **Start the Guacamole Web Application**

- Create a configuration file for Guacamole:

  ```bash
  echo "mysql-hostname=guac-mysql
  mysql-port=3306
  mysql-database=guacamole
  mysql-username=root
  mysql-password=rootpass" > guacamole.properties
  ```

- Pull and run the Guacamole web application container:
  ```bash
  docker run --platform linux/amd64 -d --name guacamole --link guacd:guacd --link guac-mysql:mysql \
  -v $(pwd)/guacamole.properties:/etc/guacamole/guacamole.properties \
  -p 8080:8080 guacamole/guacamole
  ```

---

### 5. **Access the Guacamole Web Interface**

- Open your web browser and navigate to:

  ```
  http://localhost:8080/guacamole
  ```

- Log in with the default credentials:

  - Username: `guacadmin`
  - Password: `guacadmin`

- Change the default password immediately for security.

---

## **Managing Your Setup**

### Restart Containers After a Reboot

To restart the containers after a system reboot:

```bash
docker start guac-mysql guacd guacamole
```

### Check Container Logs for Debugging

If you encounter issues, check the logs for each container:

```bash
docker logs guac-mysql
docker logs guacd
docker logs guacamole
```

---

## **Important Notes**

1. Always specify the `--platform linux/amd64` option for Docker commands when running on Apple Silicon to avoid compatibility warnings.
2. If you prefer native ARM64 images, check Docker Hub for any available ARM-compatible versions of `guacamole/guacd`, `guacamole/guacamole`, or `mysql`.

---

This updated guide ensures compatibility with Apple Silicon and provides clear steps for a successful Apache Guacamole installation.
