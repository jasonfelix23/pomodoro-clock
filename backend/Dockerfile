# # Dockerfile for building and running Spring Boot application

# # Use a base image with JDK and Maven pre-installed for building
FROM maven:3.9.8-eclipse-temurin-22 AS build

# # Set working directory
WORKDIR /app

# Copy the pom.xml file
COPY pom.xml .

# Copy the source code
COPY src ./src

# # Build the application
RUN mvn clean install

# Second stage: Use a smaller base image with just the JRE
FROM amazoncorretto:22-jdk

# Set working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY target/pomodoro-0.0.1-SNAPSHOT.jar backend.jar


RUN mkdir -p /app/libs && \
curl -L https://jdbc.postgresql.org/download/postgresql-42.3.1.jar -o /app/libs/postgresql.jar

ENV CLASSPATH=/app/libs/postgresql.jar:$CLASSPATH

EXPOSE 8080
# Command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "backend.jar"]
