import React from "react";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";

export default function TodoTitle() {

  return (
    <Container maxWidth="sm">
      <Box sx={{ mx: "auto", width: 200 }}>
        <Typography
          style={{ color: "#056", textAlign: "center"}}
          variant="h3"
          component="div"
          gutterBottom
        >
          Todo List
        </Typography>
      </Box>
    </Container>
  );
}
