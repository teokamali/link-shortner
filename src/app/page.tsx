"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddLinkService, GetLinksList } from "@/services";
import { LinkType } from "@/models/link.model";

interface FormValues {
  url: string;
}

const Home = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: LinksData, isLoading } = useQuery({
    queryKey: ["get-links-lists", page, rowsPerPage, searchQuery],
    queryFn: () =>
      GetLinksList({
        page: page + 1, // API expects 1-based index
        limit: rowsPerPage,
        search: searchQuery,
        sortBy: "createdAt",
        sortOrder: "asc",
      }),
  });

  const { mutate: AddLinkMutate } = useMutation({
    mutationFn: AddLinkService,
    onSuccess(data, variables, context) {
      setShortUrl(data.shortUrl);
      toast.success("Short URL created successfully!");
    },
    onError(error, variables, context) {
      toast.error(error.message || "Failed to create short URL.");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({ url }) => {
    AddLinkMutate({ url: url });
  };

  const domain = process.env.ORIGINAL_DOMAIN?.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  ); // Escape special regex characters

  const pattern = new RegExp(`^${domain}(/.*)?$`);

  // Handle pagination changes
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset to the first page
  };

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Enter Long URL"
          {...register("url", {
            required: "URL is required",
            pattern: {
              value: pattern,
              message: "Invalid URL format",
            },
          })}
          error={!!errors.url}
          helperText={errors.url?.message}
          margin="normal"
        />
        <Button variant="contained" type="submit" fullWidth>
          Shorten
        </Button>
      </form>

      {shortUrl && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </Typography>
      )}

      <TextField
        fullWidth
        label="Search Links"
        value={searchQuery}
        onChange={handleSearchChange}
        margin="normal"
      />

      {/* Links Table */}
      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Short ID</TableCell>
            <TableCell>Long URL</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            LinksData?.links.map((link: LinkType) => (
              <TableRow key={link.shortId}>
                <TableCell>{link.shortId}</TableCell>
                <TableCell>
                  <a
                    href={link.longUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.longUrl}
                  </a>
                </TableCell>
                <TableCell>{link.createdAt}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={LinksData?.totalCount || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Home;
