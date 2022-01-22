import { useRouter } from "next/router"
import Header from "./Header"

export default function Layout({children}){
  const router = useRouter();
  
  return(
    <>
      {router.pathname === '/GamePage' ? null : <Header/>}
      <nav>{children}</nav>
    </>
  )
}