

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

