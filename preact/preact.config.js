import tailwind from "preact-purge-tailwindcss";

module.exports = (config, env, helpers) => {
    config = tailwind(config, env, helpers);
    return config;
};
