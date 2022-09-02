import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const Homepage = () => {

  const router = useRouter()
  const { t } = useTranslation('common')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onToggleLanguageClick = (newLocale) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  const changeTo = router.locale === 'en' ? 'de' : 'en'

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <div style={{ display: 'inline-flex', width: '90%' }}>
          <div style={{ width: '50%' }}>
            <h3 style={{ minHeight: 70 }}>{t('blog.optimized.question')}</h3>
            <p>
              <Trans i18nKey='blog.optimized.answer'>
                Then you may have a look at <a href={t('blog.optimized.link')}>this blog post</a>.
              </Trans>
            </p>
            <a href={t('blog.optimized.link')}>
              <img style={{ width: '50%' }} src='https://locize.com/blog/next-i18next/next-i18next.jpg' />
            </a>
          </div>
          <div style={{ width: '50%' }}>
            <h3 style={{ minHeight: 70 }}>{t('blog.ssg.question')}</h3>
            <p>
              <Trans i18nKey='blog.ssg.answer'>
                Then you may have a look at <a href={t('blog.ssg.link')}>this blog post</a>.
              </Trans>
            </p>
            <a href={t('blog.ssg.link')}>
              <img style={{ width: '50%' }} src='https://locize.com/blog/next-i18n-static/title.jpg' />
            </a>
          </div>
        </div>
        <hr style={{ marginTop: 20, width: '90%' }} />
        <div>
          <Link
            href='/'
            locale={changeTo}
          >
            <button>
              {t('change-locale', { changeTo })}
            </button>
          </Link>
          {/* alternative language change without using Link component
          <button onClick={() => onToggleLanguageClick(changeTo)}>
            {t('change-locale', { changeTo })}
          </button>
          */}
          <Link href='/second-page'>
            <button
              type='button'
            >
              {t('to-second-page')}
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

// export const getServerSideProps = async ({ locale }) => ({
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  },
})

export default Homepage
