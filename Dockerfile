# Stage 1: Build with Maven
FROM maven:3.9.3-eclipse-temurin-17 AS build

WORKDIR /app

# 1. Copy only pom.xml to leverage Docker cache
COPY pom.xml .

# 2. Download all dependencies into local Maven repo
RUN mvn dependency:resolve -B

# 3. Copy source code
COPY src ./src

# 4. Package the application (skip tests)
RUN mvn package -DskipTests -B

# Stage 2: Run the application
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy built jar from build stage
COPY --from=build /app/target/crudapp-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
