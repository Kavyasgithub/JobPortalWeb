import React, { useState } from "react";
import { Box } from "@mui/material";
import HeaderTop from "./HeaderTop";
import SidebarAdm from "./Sidebar";


const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true); // Sidebar visible by default

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex" }}>
      <SidebarAdm open={drawerOpen} />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#002952" }}>
        <HeaderTop onMenuClick={handleDrawerToggle} />
        <Box sx={{ flex: 1, p: 0, pt: 0, bgcolor: "transparent", color: "#fff", alignItems: 'flex-start', justifyContent: 'flex-start', '& > *:first-of-type': { mt: 0, marginTop: 0 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
