CREATE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_timestamp = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    country TEXT NOT NULL,
    password TEXT NOT NULL,
    updated_timestamp TIMESTAMP,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_user_timestamp
    BEFORE UPDATE
    ON
        users
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    preference TEXT NOT NULL,
    value TEXT NOT NULL,
    updated_timestamp TIMESTAMP,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TRIGGER update_user_preference_timestamp
    BEFORE UPDATE
    ON
        user_preferences
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    calories INT NOT NULL,
    category TEXT NOT NULL,
    meal TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    updated_timestamp TIMESTAMP,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (category, meal, cuisine)
);

CREATE TRIGGER update_recipe_timestamp
    BEFORE UPDATE
    ON
        recipes
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    url TEXT NOT NULL,
    updated_timestamp TIMESTAMP,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_workout_timestamp
    BEFORE UPDATE
    ON
        workouts
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();