import { AppRoutes } from "@/constants/routes"
import { LogoLink } from "./styles"

export const Logo = () => {
  return (
    <LogoLink href={AppRoutes.HOME}>
      <span>TOKIO.</span>
      <span>AI</span>
    </LogoLink>
  )
}