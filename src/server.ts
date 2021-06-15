process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import ImportRoute from '@routes/import.route';
import ReportsRoute from '@routes/reports.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new ImportRoute(), new ReportsRoute()]);

app.listen();
