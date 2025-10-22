# -------------------------------
# Step 1: Build the application
# -------------------------------
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies (cached)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the rest of the project files
COPY . .

# Build the application (skip tests for faster build)
RUN mvn clean package -DskipTests

# -------------------------------
# Step 2: Run the application
# -------------------------------
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy jar file from the previous build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 (Spring Boot default)
EXPOSE 8081

# ✅ Run the Spring Boot app (corrected)
ENTRYPOINT ["java", "-jar", "app.jar"]

