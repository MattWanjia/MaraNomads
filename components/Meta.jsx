import React from 'react'
import Head from 'next/head'
import Script from 'next/script'

export default function Meta({title, keywords, description}) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <title>{title}</title>
      </Head>
    </>
  )
}

Meta.defaultProps = {
    title: 'Mara Nomads',
    keywords: 'Tours and Travel',
    description: 'Experience the world',
  }