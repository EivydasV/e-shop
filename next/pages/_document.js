import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body className='bg-[#00091a] text-gray-200 font-body'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
