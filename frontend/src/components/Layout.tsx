type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="container max-w-full mx-auto px-7">
      {children}
    </div>
  )
}
export default Layout
