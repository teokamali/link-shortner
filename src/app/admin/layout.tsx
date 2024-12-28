"use client";

import React, { useLayoutEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface FormInputs {
  username: string;
  password: string;
}

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = ({ username, password }) => {
    const adminUser = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username === adminUser && password === adminPassword) {
      setIsAuthenticated(true);
      Cookies.set("admin-auth", "true", { expires: 1 }); // Cookie expires in 1 day
      toast.success("Logged in successfully!");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  useLayoutEffect(() => {
    const token = Cookies.get("admin-auth");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: 300,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AdminLayout;
