# ===== Stage 1: Build the app =====
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first (for caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Package the app (skip tests to save time)
RUN mvn -B clean package -DskipTests

# ===== Stage 2: Run the app =====
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8081

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
