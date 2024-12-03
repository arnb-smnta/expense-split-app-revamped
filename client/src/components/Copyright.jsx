import { Link, styled, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { githublink } from "../utils/helper";

export default function Copyright() {
  return (
    <Typography
      mt="-2"
      variant="body2"
      align="center"
      sx={{ color: "text.secondary" }}
    >
      &copy; Arnab Samanta | Open Source &nbsp;
      <FavoriteIcon
        color="error"
        sx={{ fontSize: 18, mb: "-2px", ml: "-5px" }}
      />
      <br />
      <Link
        variant="subtitle3"
        component={"a"}
        href={`${githublink}`}
        target="_blank"
      >
        [GitHub]
      </Link>
    </Typography>
  );
}