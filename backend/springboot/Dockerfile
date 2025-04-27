

FROM openjdk:17-jdk-alpine

RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY target/*.jar app.jar
USER app

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

