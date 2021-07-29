import logo from '../../assets/logo.png'

function Logo(): JSX.Element {
  return (
    <div className="inline-block w-12">
      <img src={logo} alt="pizzaChallengeLogo" />
    </div>
  )
}

export default Logo
