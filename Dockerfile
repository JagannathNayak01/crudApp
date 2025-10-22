# -------------------------------
# Step 1: Build the application
# -------------------------------
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy only pom.xml first to leverage Docker cache
COPY pom.xml .

# Download all dependencies offline (cached layer)
RUN mvn dependency:go-offline -B

# Now copy the full project source
COPY . .

# Build the Spring Boot application (skip tests for faster build)
RUN mvn clean package -DskipTests

# -------------------------------
# Step 2: Run the application
# -------------------------------
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy the jar built in the previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (match Spring Boot port in application.properties)
EXPOSE 8081

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
