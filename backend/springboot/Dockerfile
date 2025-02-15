#FROM maven:3.8.5-openjdk-17 AS build
#COPY src /home/app/src
#COPY pom.xml /home/app
#RUN mvn -f /home/app/pom.xml clean package -DskipTests
#
#COPY src/main/resources/.env /home/app/.env
#
#FROM openjdk:17-alpine
#ARG JAR_FILE=/home/app/target/Parking.jar
#COPY --from=build ${JAR_FILE} application.jar
#ENTRYPOINT ["java", "-jar", "application.jar"]

# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Create a non-root user for security
RUN addgroup -S app && adduser -S app -G app

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file into the container
COPY target/*.jar app.jar
#COPY src/main/resources/.env /app/.env
# Set the user to 'app'
USER app

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

