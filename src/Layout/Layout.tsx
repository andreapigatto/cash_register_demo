import { ReactNode } from 'react'
import Button from '../components/Button/Button'
import Logo from '../components/Logo/Logo'

type ComponentProps = {
  children: ReactNode
  nextButton?: { route: string }
  prevButton?: { route: string }
}

function Layout({
  children,
  nextButton,
  prevButton,
}: ComponentProps): JSX.Element {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="flex justify-center items-center space-x-4 text-3xl text-red-500 my-16">
        <Logo />
        <h1>Pizza challenge</h1>
      </h1>
      {children}
      {prevButton && <div className="mt-8 border-t-2" />}
      <div className="my-4 flex justify-center space-x-4">
        {prevButton && <Button name="prev" link={prevButton.route} />}
        {nextButton && <Button name="next" link={nextButton.route} />}
      </div>
    </div>
  )
}

export default Layout
