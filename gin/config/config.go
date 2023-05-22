package config

import (
	"errors"
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	Server ServerConfig
	JWT      JWTConfig
	External ExternalConfig
	Postgres 	 PostgresConfig
	Logger  LoggerConfig
}

type ServerConfig struct {
	Port string `mapstructure:"PORT"`
	Mode              string        `mapstructure:"MODE"`
	Debug             bool          `mapstructure:"DEBUG"`
}

type PostgresConfig struct {
	DBHost     string `mapstructure:"DB_HOST"`
	DBPort     string `mapstructure:"DB_PORT"`
	DBUser     string `mapstructure:"DB_USER"`
	DBPassword string `mapstructure:"DB_PASSWORD"`
	DBName     string `mapstructure:"DB_NAME"`
}

type LoggerConfig struct {
	Development       bool   `mapstructure:"LOGGER_DEVELOPMENT"`
	DisableCaller     bool   `mapstructure:"LOGGER_DISABLE_CALLER"`
	DisableStacktrace bool   `mapstructure:"LOGGER_DISABLE_TRACE"`
	Encoding          string `mapstructure:"LOGGER_ENCODING"`
	Level             string `mapstructure:"LOGGER_LEVEL"`
}

type JWTConfig struct {
	JwtSecretKey  string `mapstructure:"JWT_SECRET_KEY"`
	JwtIssuer     string `mapstructure:"JWT_ISSUER"`
	AccessExpMin  int    `mapstructure:"ACCESS_EXP_MIN"`
	RefreshExpMin int    `mapstructure:"REFRESH_EXP_MIN"`
}

type ExternalConfig struct {
	CloudinaryURL      string `mapstructure:"CLOUDINARY_URL"`
}

func LoadConfig() (*viper.Viper, error) {
	v := viper.New()

	v.AddConfigPath(".")
	v.SetConfigFile(".env")
	v.AutomaticEnv()
	if err := v.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			return nil, errors.New("config file not found")
		}
		return nil, err
	}

	return v, nil
}

func ParseConfig(v *viper.Viper) (*Config, error) {
	var c Config

	if err := v.Unmarshal(&c.Server); err != nil {
		log.Printf("unable to decode into struct, %v", err)
		return nil, err
	}

	if err := v.Unmarshal(&c.Postgres); err != nil {
		log.Printf("unable to decode into struct, %v", err)
		return nil, err
	}

	if err := v.Unmarshal(&c.JWT); err != nil {
		log.Printf("unable to decode into struct, %v", err)
		return nil, err
	}

	if err := v.Unmarshal(&c.Logger); err != nil {
		log.Printf("unable to decode into struct, %v", err)
		return nil, err
	}

	if err := v.Unmarshal(&c.External); err != nil {
		log.Printf("unable to decode into struct, %v", err)
		return nil, err
	}

	return &c, nil
}
