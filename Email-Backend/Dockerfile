# 1. Use the official Java 23 lightweight image from Eclipse
FROM eclipse-temurin:23-jdk-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy Maven wrapper script and related files
COPY mvnw .
COPY .mvn .mvn

# 4. Make mvnw executable (Linux needs this)
RUN chmod +x mvnw

# 5. Copy pom.xml (project configuration)
COPY pom.xml .

# 6. Pre-fetch dependencies (saves time during rebuilds)
RUN ./mvnw dependency:go-offline -B

# 7. Copy the entire source code (now that dependencies are cached)
COPY src ./src

# 8. Build the application
RUN ./mvnw clean package -DskipTests

# 9. Set the command to run your JAR file when the container starts
CMD ["java", "-jar", "target/email-writer-sb-0.0.1-SNAPSHOT.jar"]
