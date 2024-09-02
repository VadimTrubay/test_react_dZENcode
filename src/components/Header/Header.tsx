import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors";
import {AppBar, Toolbar} from "@mui/material";
import Logo from "../Logo/Logo";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Header.module.css"


const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <AppBar className={styles.app_bar} position="static">
        <Toolbar className={styles.app_bar}>
          <Logo/>
          {isLoggedIn ? <UserMenu/> : <AuthNav/>}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
