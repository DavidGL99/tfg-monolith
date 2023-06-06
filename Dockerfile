FROM --platform=linux/amd64 maven:3.8.5-openjdk-17 as build
ADD target/*.jar app.jar
CMD java -jar app.jar
