# -------------------------------
# Step 1: Build the application
# -------------------------------
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml first to cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy full project
COPY . .

# Build Spring Boot app
RUN mvn clean package -DskipTests

# -------------------------------
# Step 2: Run the application
# -------------------------------
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the Spring Boot port
EXPOSE 8081

# Environment variables for MySQL
ENV SPRING_DATASOURCE_URL=jdbc:mysql://shuttle.proxy.rlwy.net:50033/railway
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=sRaEGqfUCQlZhDhdqhBlqyPUPeZqasGE
ENV SPRING_JPA_HIBERNATE_DDL_AUTO=update
ENV SPRING_JPA_SHOW_SQL=true

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
