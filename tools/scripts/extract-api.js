/**
 * The "api-extractor run" command line script cannot be used because the dist folder
 * and source code are located separately. By default, api-extractor assumes that both
 * the tsconfig and package.json files are in the same directory and it is not possible
 * to pass the correct path to the package.json file through the api-extractor.json.
 */
const fs = require('fs');
const path = require('path');
const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');
const minimist = require('minimist');

const unparseableStatement = minimist(
  process.argv.slice(2)
).unparseableStatement;
const buildOutputPath = minimist(process.argv.slice(2)).buildOutputPath;
const isLocal = minimist(process.argv.slice(2)).local;

const apiExtractorJsonPath = path.join(process.cwd(), 'api-extractor.json');
// Load and parse the api-extractor.json file
const configFile = ExtractorConfig.loadFile(apiExtractorJsonPath);
const packageJsonFullPath = path.join(
  process.cwd(),
  buildOutputPath,
  'package.json'
);

const extractorConfig = ExtractorConfig.prepare({
  configObject: {
    ...configFile,
    apiReport: {
      ...configFile.apiReport,
      reportFolder: '../../api-reports-via-script',
    },
  },
  configObjectFullPath: apiExtractorJsonPath,
  packageJsonFullPath,
});
// Invoke API Extractor
const extractorResult = Extractor.invoke(extractorConfig, {
  // Equivalent to the "--local" command-line parameter
  localBuild: true,

  // Equivalent to the "--verbose" command-line parameter
  showVerboseMessages: true,
});

if (extractorResult.succeeded) {
  console.log(`API Extractor completed successfully`);
  process.exitCode = 0;
} else {
  console.error(
    `API Extractor completed with ${extractorResult.errorCount} errors` +
      ` and ${extractorResult.warningCount} warnings`
  );

  process.exitCode = 1;
}
