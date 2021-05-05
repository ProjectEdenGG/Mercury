package me.pugabyte.mercury.thymeleaf;

import eden.models.nerd.Nerd;
import eden.models.punishments.PunishmentType;
import eden.utils.StringUtils;
import eden.utils.TimeUtils;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.IExpressionContext;
import org.thymeleaf.dialect.AbstractDialect;
import org.thymeleaf.dialect.IExpressionObjectDialect;
import org.thymeleaf.expression.IExpressionObjectFactory;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UtilsDialect extends AbstractDialect implements IExpressionObjectDialect {
	final List<Class<?>> utils = Arrays.asList( // Add Util classes here
			StringUtils.class, TimeUtils.class, Nerd.class
	);

	public UtilsDialect() {
		super("UtilsDialect");
	}

	@Override
	public IExpressionObjectFactory getExpressionObjectFactory() {

		return new IExpressionObjectFactory() {

			@Override
			public Set<String> getAllExpressionObjectNames() {
				return utils.stream().map(Class::getSimpleName).collect(Collectors.toSet());
			}

			@Override
			@SneakyThrows
			public Object buildObject(IExpressionContext context, String expressionObjectName) {
				return utils.stream().filter(clazz -> clazz.getSimpleName().equals(expressionObjectName)).findFirst().orElse(null);
			}

			@Override
			public boolean isCacheable(String expressionObjectName) {
				return true;
			}
		};
	}
}