import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Toolbar, IconButton, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material";
export default function FixedFooter() {
  const theme = useTheme();
  return (
    <Box
      component={"footer"}
      sx={{
        background: theme.palette.primary.main,
        color: "white",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Typography>Banking application</Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <IconButton sx={{ background: "white" }} href="/">
            <Facebook color="secondary" />
          </IconButton>
          <IconButton sx={{ background: "white" }} href="/">
            <Instagram color="secondary" />
          </IconButton>
          <IconButton sx={{ background: "white" }} href="/">
            <Twitter color="secondary" />
          </IconButton>
        </Stack>
      </Toolbar>
    </Box>
  );
}
