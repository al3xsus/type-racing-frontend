import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import RaceFlagIcon from "../assets/race-flag.svg"
import MainPageIcon from "../assets/logo.png"
import AdminIcon from "../assets/administrator.svg"
import {Link} from "@material-ui/core";
import {isAdmin} from "../utils/AuxFns";
import UnderConstructionImg from "../assets/under-construction.svg";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

interface menuProps {
    pathname: string
    customHistoryPush: (pathname: string) => void
}

export default (params: menuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                <MenuIcon/>
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    disabled={params.pathname === "/"}
                    onClick={() => {
                        params.customHistoryPush("/")
                        handleClose()
                    }}>
                    <ListItemIcon>
                        <img src={MainPageIcon} height={25} width={25} alt={"main-page"}/>
                    </ListItemIcon>
                    <Link>Main Page</Link>
                </MenuItem>
                <MenuItem
                    disabled={params.pathname.replace("/", "") === "user"}
                    onClick={() => {
                        params.customHistoryPush("/user")
                        handleClose()
                    }}
                >
                    <ListItemIcon>
                        <img src={RaceFlagIcon} height={25} width={25} alt={"race-flag"}/>
                    </ListItemIcon>
                    <Link>Texts for race</Link>
                </MenuItem>
                <MenuItem
                    disabled={params.pathname.replace("/", "") === "scores"}
                    onClick={() => {
                        params.customHistoryPush("/scores")
                        handleClose()
                    }}
                >
                    <ListItemIcon>
                        <img height={25} width={25} src={UnderConstructionImg} alt={"under-construction"}/>
                    </ListItemIcon>
                    <Link>Hall of fame</Link>
                </MenuItem>
                {isAdmin() && <MenuItem
                  disabled={params.pathname.replace("/", "") === "admin"}
                  onClick={() => {
                      params.customHistoryPush("/admin")
                      handleClose()
                  }}
                >
                  <ListItemIcon>
                    <img src={AdminIcon} height={25} width={25} alt={"race-flag"}/>
                  </ListItemIcon>
                  <Link>Admin part</Link>
                </MenuItem>}
            </StyledMenu>
        </div>
    );
}
