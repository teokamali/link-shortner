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
  Stack,
  Container,
} from "@mui/material";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddLinkService,
  GetLinksList,
  DeleteLinkService,
  getQueryClient,
} from "@/services";
import { LinkType } from "@/models/link.model";
import { ContentCopy, Delete } from "@mui/icons-material";
import { formatPersianDate } from "@/lib/formatPersianDate";

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

  const queryClient = getQueryClient();
  const { mutate: DeleteMutation } = useMutation({
    mutationFn: DeleteLinkService,
    onSuccess(data, variables, context) {
      toast.success("link Removed");
      queryClient.refetchQueries({ queryKey: ["get-links-lists"] });
    },
    onError(error, variables, context) {
      toast.error(error.message || "Failed to create short URL.");
    },
  });

  const { mutate: AddLinkMutate } = useMutation({
    mutationFn: AddLinkService,
    onSuccess(data, variables, context) {
      setShortUrl(data.shortUrl);
      toast.success("Short URL created successfully!");
      queryClient.refetchQueries({ queryKey: ["get-links-lists"] });
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

  // Handle delete link
  const handleDeleteLink = (linkId: string) => {
    DeleteMutation({ _id: linkId });
  };

  // Handle copy short URL to clipboard
  const handleCopyToClipboard = (shortUrl: string) => {
    navigator.clipboard
      .writeText(`${process.env.SHORT_DOMAIN}/${shortUrl}`)
      .then(() => {
        toast.success("Short URL copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy the URL.");
        console.error(err);
      });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", my: 5 }}>
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
            ساخت لینک
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
      </Box>

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
            <TableCell>Visited</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
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
                <TableCell>{link.visitedCounts}</TableCell>
                <TableCell>{formatPersianDate(link.created_at)}</TableCell>
                <TableCell>
                  <Stack
                    width={"fit-content"}
                    direction={"row"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteLink(link._id)}
                      sx={{ mr: 1 }}
                    >
                      <Delete />
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => handleCopyToClipboard(link.shortId)}
                    >
                      <ContentCopy />
                    </Button>
                  </Stack>
                </TableCell>
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
    </Container>
  );
};

export default Home;
