DROP FUNCTION IF EXISTS update_timestamp;

DROP TRIGGER IF EXISTS update_user_timestamp ON TABLE users;
DROP TRIGGER IF EXISTS update_user_preference_timestamp ON TABLE user_preferences;
DROP TRIGGER IF EXISTS update_recipe_timestamp ON TABLE recipes;
DROP TRIGGER IF EXISTS update_workout_timestamp ON TABLE workouts;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS workouts;