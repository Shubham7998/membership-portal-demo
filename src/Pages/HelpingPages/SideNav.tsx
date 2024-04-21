import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../appStore';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TableChartIcon from '@mui/icons-material/TableChart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import MailIcon from '@mui/icons-material/Mail';
import ViewListIcon from '@mui/icons-material/ViewList';
import { CssBaseline, List } from '@mui/material';
import Groups3Icon from '@mui/icons-material/Groups3';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    position : "relative",
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideNav() {
  const theme = useTheme();
  const updateOpen = useAppStore((state : any) => state.updateOpen);
  const dOpen = useAppStore((state : any) => state.dOpen);
  const isOpen = typeof dOpen === 'boolean' ? dOpen : false;
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', icon: <HomeIcon />, route: '/' },
    { label: 'Show Users', icon: <PeopleIcon />, route: '/showusers' },
    { label: 'Show Subscribers', icon: <ViewListIcon />, route: '/showsubscribers' },
    { label: 'Show Products', icon: <LocalMallIcon />, route: '/showproducts' },
    { label: 'Show Discounts', icon: <AttachMoneyIcon />, route: '/showdiscounts' },
    { label: 'Show Taxes', icon: <MonetizationOnIcon />, route: '/showtaxes' },
    { label: 'Show Genders', icon: <Groups3Icon />, route: '/showgenders' },
    { label: 'Show Subscriptions', icon: <SubscriptionsIcon />, route: '/showsubscriptions' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader>
          <IconButton onClick={() => updateOpen(!isOpen)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: 'block', '&:hover': { bgcolor: '#f5f5f5' } }}
              onClick={() => navigate(item.route)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ opacity: isOpen ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
