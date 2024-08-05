import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const CustomButton = ({
  onClick,
  variant = "contained",
  color = "primary",
  text,
  icon: Icon = SendIcon,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      {...props}
      sx={{
        backgroundColor: "#93AB4F",
        color: "#FFFFFF",
        width: "30%",
        marginLeft: "80px",
        marginTop: "20px",
        "&:hover": { backgroundColor: "#A01523" },
      }}
      endIcon={<Icon />}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
