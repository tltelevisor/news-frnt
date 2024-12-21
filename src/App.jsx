import IntroSection from './components/IntroSection'
import NewsSection from './components/NewsSection'

export default function App({config}) {

  return (
    <>
      <main>
        <IntroSection config={config}/>
        <NewsSection />
      </main>
    </>
  )
}
