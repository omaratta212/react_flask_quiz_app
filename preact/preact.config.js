import tailwind from "preact-purge-tailwindcss";

module.exports = (config, env, helpers) => {
    if(config.optimization && config.optimization.minimizer){
        config.optimization.minimizer[0].options.extractComments = false;
    }
    config = tailwind(config, env, helpers);
    return config;
};
