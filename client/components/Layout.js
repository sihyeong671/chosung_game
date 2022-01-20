import Header from "./Header"

export default function Layout({children}){
  return(
    <>
      <Header/>
      <nav>{children}</nav>
    </>
  )
}