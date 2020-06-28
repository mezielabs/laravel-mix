import { IocContract } from '@adonisjs/fold'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class MixProvider {
  constructor (protected $container: IocContract) {}

  public async boot () {
    if (!this.$container.hasBinding('Adonis/Core/View')) {
      throw new Error('You need to install the @adonisjs/view package to use this package.')
    }

    this.$container.with(['Adonis/Core/Application', 'Adonis/Core/View'], (Application: ApplicationContract, View) => {
      View.global('mix', (assetPath: string) => {
        if (!assetPath) {
          return
        }

        const path = assetPath.startsWith('/') ? assetPath : `/${assetPath}`

        const manifest = require(Application.publicPath('mix-manifest.json'))

        return manifest[path]
      })
    })
  }
}
