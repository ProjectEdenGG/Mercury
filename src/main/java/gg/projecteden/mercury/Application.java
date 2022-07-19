package gg.projecteden.mercury;

import gg.projecteden.api.common.DatabaseConfig;
import gg.projecteden.api.common.EdenAPI;
import gg.projecteden.api.common.utils.Env;
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

	@Override
	public void shutdown() {

	}

	@Getter
	@Value("${gg.projecteden.mercury.env}")
	private Env env;

	@Getter
	@Value("${gg.projecteden.mercury.databases.mongodb.password}")
	private String mongodb_password;

	@Override
	public DatabaseConfig getDatabaseConfig() {
		return DatabaseConfig.builder()
				.password(mongodb_password)
				.env(env)
				.build();
	}

}
