import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ApartmentIcon from "@mui/icons-material/ApartmentOutlined";

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <IconButton aria-label="apartment">
          <ApartmentIcon sx={{ height: 40, width: 40 }} />
        </IconButton>
        <CardContent>
          <Typography gutterBottom variant="h3">
            32
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Prédio
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
