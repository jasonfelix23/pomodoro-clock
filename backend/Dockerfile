# # Dockerfile for building and running Spring Boot application

# # Use a base image with JDK and Maven pre-installed for building
# FROM maven:3.9.8-amazoncorretto-8-al2023 AS build

# # Set working directory
# WORKDIR /app



# # Build the application
# RUN mvn clean install

# Second stage: Use a smaller base image with just the JRE
FROM amazoncorretto:22-jdk

# Set working directory
WORKDIR /app
# Copy the pom.xml file
COPY pom.xml .

# Copy the source code
COPY src ./src

# Copy the built JAR file from the build stage
COPY target/pomodoro-0.0.1-SNAPSHOT.jar backend.jar

EXPOSE 8080

RUN mkdir -p /app/libs && \
    curl -L https://jdbc.postgresql.org/download/postgresql-42.3.1.jar -o /app/libs/postgresql.jar

ENV CLASSPATH=/app/libs/postgresql.jar:$CLASSPATH

# Command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "backend.jar"]
