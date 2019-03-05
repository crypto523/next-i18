import isNode from 'detect-node'

import defaultConfig from './default-config'

const deepMergeObjects = ['detection']

export default (userConfig) => {

  if (typeof userConfig.localeSubpaths === 'boolean') {
    throw new Error('The localeSubpaths option has been changed to a string: "none", "foreign", or "all"')
  }

  let combinedConfig = {
    ...defaultConfig,
    ...userConfig,
  }

  deepMergeObjects.forEach((obj) => {
    combinedConfig[obj] = {
      ...defaultConfig[obj],
      ...userConfig[obj],
    }
  })

  if (!userConfig.fallbackLng) {
    combinedConfig.fallbackLng = process.env.NODE_ENV === 'production'
      ? combinedConfig.defaultLanguage
      : false
  }

  combinedConfig.allLanguages = combinedConfig.otherLanguages
    .concat([combinedConfig.defaultLanguage])

  combinedConfig.ns = [combinedConfig.defaultNS]

  combinedConfig.whitelist = combinedConfig.allLanguages

  if (isNode && !process.browser) {
    const fs = eval("require('fs')")
    const path = require('path')

    const getAllNamespaces = p => fs.readdirSync(p).map(file => file.replace('.json', ''))
    const {
      allLanguages, defaultLanguage, localePath, localeStructure,
    } = combinedConfig

    combinedConfig = {
      ...combinedConfig,
      preload: allLanguages,
      ns: getAllNamespaces(path.join(process.cwd(), `${localePath}/${defaultLanguage}`)),
      backend: {
        loadPath: path.join(process.cwd(), `${localePath}/${localeStructure}.json`),
        addPath: path.join(process.cwd(), `${localePath}/${localeStructure}.missing.json`),
      },
    }
  }

  return combinedConfig

}
