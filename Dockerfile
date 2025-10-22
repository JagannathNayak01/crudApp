# Stage 1: Build
FROM maven:3.9.3-eclipse-temurin-17 AS build

WORKDIR /app

# Copy everything
COPY pom.xml .
COPY src ./src

# Build the jar (downloads dependencies automatically)
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/crudapp-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
