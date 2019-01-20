import React from 'react'
import { Trans } from 'react-i18next'

export default class WrappedTrans extends React.Component {
  render() {
    const { nextI18NextConfig } = this.props
    const { i18n } = nextI18NextConfig

    return (
      <Trans {...this.props} i18n={i18n} />
    )
  }
}
