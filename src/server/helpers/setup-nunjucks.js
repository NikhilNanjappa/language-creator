import nunjucks from 'nunjucks';

export const setupNunjucks = (app) => {
  const config = {
    autoescape: true,
    express: app,
    noCache: true,
    watch: false,
  };

  const views = [
    'src/views/'
  ];

  nunjucks.configure(views, config);

  app.set('view engine', 'njk');
  app.engine('njk', nunjucks.render);
};

export { setupNunjucks as default };