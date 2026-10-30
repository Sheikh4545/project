import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

export default async function globalTeardown() {
  console.log('Test completed successfully ...');
  try {
    const resultsDir = path.resolve('allure-results');
    if (fs.existsSync(resultsDir) && fs.readdirSync(resultsDir).length > 0) {
      await execAsync('npx -y allure generate allure-results --clean -o allure-report');
      console.log('Allure report successfully generated!');
    } else {
      console.log('No allure-results found to generate Allure report.');
    }

    // Never run 'allure open' in CI as it starts a blocking web server that hangs CI workflows
    if (!process.env.CI) {
      if (fs.existsSync(path.resolve('allure-report'))) {
        exec('npx -y allure open allure-report');
      }
    }
  } catch (error) {
    console.error('Error generating Allure report :', error);
  }
}
