val edenApiVersion: String by project

plugins {
	`java-library`
	id("org.springframework.boot") version "2.4.5"
	id("io.spring.dependency-management") version "1.0.12.RELEASE"
	id("com.github.johnrengelman.shadow") version "7.1.2"
}

group = "gg.projecteden"
version = "0.0.1-SNAPSHOT"

repositories {
	mavenLocal { content { includeGroup("gg.projecteden") } }
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
	implementation("org.springframework.boot:spring-boot-starter-web")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
	annotationProcessor("org.projectlombok:lombok")
	implementation("gg.projecteden:eden-common:${edenApiVersion}")
	implementation("gg.projecteden:eden-db:${edenApiVersion}")
}

tasks {
	compileJava {
		options.encoding = Charsets.UTF_8.name()
		options.release.set(17)
		options.compilerArgs.add("-parameters")
	}
}
