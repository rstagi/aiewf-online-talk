import { useState, useCallback } from 'react'
import { slides, type Slide } from './data/slides'
import { chapterForSlide, throneHolderForSlide } from './data/chapters'
import { useSlideNavigation } from './hooks/useSlideNavigation'
import { useKeyboardNav } from './hooks/useKeyboardNav'
import { SlideContainer } from './components/core/SlideContainer'
import { RealmChrome } from './components/core/RealmChrome'
import { PresenterNotes } from './components/core/PresenterNotes'
import {
  TitleScene,
  AboutScene,
  ThroneScene,
  StatementScene,
  SplitScene,
  RoadScene,
  DataScene,
  CodeScene,
  BannermenScene,
  QuoteScene,
  RecapScene,
} from './components/scenes'

function getStepCount(index: number): number {
  return slides[index].steps
}

function renderScene(slide: Slide, subStep: number) {
  switch (slide.type) {
    case 'title':
      return <TitleScene content={slide.content} subStep={subStep} />
    case 'about':
      return <AboutScene content={slide.content} />
    case 'throne':
      return <ThroneScene content={slide.content} subStep={subStep} />
    case 'statement':
      return <StatementScene content={slide.content} subStep={subStep} />
    case 'split':
      return <SplitScene content={slide.content} />
    case 'road':
      return <RoadScene content={slide.content} />
    case 'data':
      return <DataScene content={slide.content} />
    case 'code':
      return <CodeScene content={slide.content} subStep={subStep} />
    case 'bannermen':
      return <BannermenScene content={slide.content} subStep={subStep} />
    case 'quote':
      return <QuoteScene content={slide.content} />
    case 'recap':
      return <RecapScene content={slide.content} />
  }
}

function titleOf(slide: Slide): string {
  switch (slide.type) {
    case 'title':
      return slide.content.title
    case 'about':
      return slide.content.name
    case 'quote':
      return slide.content.quote
    default:
      return (slide.content as { assertion: string }).assertion
  }
}

export default function App() {
  const [notesOpen, setNotesOpen] = useState(false)
  const { currentIndex, subStep, next, prev, goTo } = useSlideNavigation({
    totalSlides: slides.length,
    getStepCount,
  })
  const toggleNotes = useCallback(() => setNotesOpen(o => !o), [])
  useKeyboardNav({ onNext: next, onPrev: prev, onToggleNotes: toggleNotes, onGoTo: goTo })

  // Tap to navigate (mainly for touch / mobile): right half advances, left half
  // goes back. Interactive elements win — a tap on a link or button never
  // triggers navigation, so the About-page links stay tappable.
  const handleTap = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('a, button, [data-no-tap-nav]')) return
      if (e.clientX < window.innerWidth / 2) prev()
      else next()
    },
    [next, prev],
  )

  const slide = slides[currentIndex]
  const oneBased = currentIndex + 1
  const chapter = chapterForSlide(oneBased)
  const holder = throneHolderForSlide(oneBased)
  const showChrome = slide.chrome !== false

  return (
    <div className="deck" onClick={handleTap}>
      <SlideContainer slideKey={slide.id}>{renderScene(slide, subStep)}</SlideContainer>

      <RealmChrome
        chapter={chapter}
        holder={holder}
        index={currentIndex}
        total={slides.length}
        visible={showChrome}
      />

      <PresenterNotes
        notes={slide.notes}
        title={titleOf(slide)}
        index={currentIndex}
        total={slides.length}
        visible={notesOpen}
      />
    </div>
  )
}
