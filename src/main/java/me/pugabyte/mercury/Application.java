package me.pugabyte.mercury;

import eden.EdenAPI;
import eden.mongodb.DatabaseConfig;
import eden.utils.Env;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application extends EdenAPI {

	public static void main(String[] args) {
		new Application();
		SpringApplication.run(Application.class, args);
	}

	public Application() {
		instance = this;
	}

	@Getter
	@Value("${me.pugabyte.mercury.env}")
	private Env env;

	@Getter
	@Value("${me.pugabyte.mercury.databases.mongodb.password}")
	private String mongodb_password;

	@Override
	public DatabaseConfig getDatabaseConfig() {
		return DatabaseConfig.builder()
				.password(mongodb_password)
				.env(env)
				.build();
	}

}
