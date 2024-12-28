"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

interface FormValues {
  longUrl: string;
}

const Home = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({ longUrl }) => {
    try {
      const response = await fetch(`/api/shorten?longUrl=${longUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
        toast.success("Short URL created successfully!");
        reset(); // Reset the form
      } else {
        toast.error(data.error || "Failed to create short URL.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };
  const domain = process.env.ORIGINAL_DOMAIN?.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  ); // Escape special regex characters

  const pattern = new RegExp(`^${domain}(/.*)?$`);
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Enter Long URL"
          {...register("longUrl", {
            required: "URL is required",
            pattern: {
              value: pattern,
              message: "Invalid URL format",
            },
          })}
          error={!!errors.longUrl}
          helperText={errors.longUrl?.message}
          margin="normal"
        />
        <Button variant="contained" type="submit" fullWidth>
          Shorten
        </Button>
      </form>

      {shortUrl && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Short URL:{" "}
          <a
            href={`http://${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>
        </Typography>
      )}
    </Box>
  );
};

export default Home;
