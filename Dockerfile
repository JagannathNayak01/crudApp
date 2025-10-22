# Stage 1: Build
FROM maven:3.9.3-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml first (for caching dependencies)
COPY pom.xml .

# Download dependencies and build the project (skip tests)
RUN mvn clean package -DskipTests

# Copy the source code
COPY src ./src

# Build the final jar (skip tests again)
RUN mvn package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/target/crudapp-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
