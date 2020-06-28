/* eslint-disable max-len */

import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { join } from 'path'

/**
 * Instructions to be executed when setting up the package.
 */
export default async function instructions (
  projectRoot: string,
  _: ApplicationContract,
  sink: typeof sinkStatic,
) {
  const pkg = new sink.files.PackageJsonFile(projectRoot)

  /**
   * Scripts to run encore
   */
  pkg.appendScript('mix:dev', 'cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js')
  pkg.appendScript('mix:watch', 'cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js -- --watch')
  pkg.appendScript('mix:hot', 'cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js')
  pkg.appendScript('mix:prod', 'cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js')

  /**
   * Copy webpack config file
   */
  sink.utils.copyFiles(join(__dirname, 'templates'), projectRoot, ['webpack.mix.js'])

  /**
   * Install required dependencies
   */
  sink.logger.info('Installing "laravel-mix" and "cross-env"...')

  pkg.install('laravel-mix', undefined, true)
  pkg.install('cross-env', undefined, true)
  await pkg.commitAsync()

  sink.logger.success('Packages installed!')

  /**
   * Usage instructions
   */
  console.log(' ')
  console.log(`   ${sink.colors.gray('$')} Run ${sink.colors.cyan('npm run mix:dev')} to start the build`)
  console.log(`   ${sink.colors.gray('$')} Run ${sink.colors.cyan('npm run mix:watch')} to start the build and watch for changes`)
  console.log(`   ${sink.colors.gray('$')} Run ${sink.colors.cyan('npm run mix:hot')} to start the build with hot reload`)
  console.log(`   ${sink.colors.gray('$')} Run ${sink.colors.cyan('npm run mix:prod')} to build for production`)
}
