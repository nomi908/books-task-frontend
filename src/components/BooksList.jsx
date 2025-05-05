import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Grid, Card, CardMedia, CardContent, Typography,
  Pagination, CircularProgress, Box, Button, TextField
} from '@mui/material';
import { Link } from 'react-router-dom';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const booksPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setBooks(response.data);
          setFilteredBooks(response.data);  // Set all books initially
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  // Filter books based on search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the books based on title or author matching the search query
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.authors.join(' ').toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (_, value) => setCurrentPage(value);

  return (
    <Container sx={{ mt: 4 }}>
      {/* Book List */}
      <Typography variant="h4" gutterBottom align="center">
        Book List
      </Typography>

      {/* Search Bar */}
      <Box sx={{ mt: 4, mb: 4 }}>
        <TextField
          label="Search by Title or Author"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Display Books */}
          <Grid container spacing={3}>
            {currentBooks.length > 0 ? (
              currentBooks.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} key={book.isbn || index}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%', // Makes sure cards are consistent in height
                      boxShadow: 3,
                      borderRadius: 2,
                    }}
                  >
                    {/* Card Media - Image */}
                    <Box
                      sx={{
                        height: 200, // Fixed height for image section
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#f5f5f5',
                        overflow: 'hidden',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={book.thumbnailUrl}
                        alt={book.title}
                        sx={{
                          width: '100%', // Make the image take full width
                          height: '100%', // Make the image take full height
                          objectFit: 'cover', // Ensure the image fills the space and maintains aspect ratio
                        }}
                      />
                    </Box>

                    {/* Card Content - Title and Author */}
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1rem',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {book.title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{
                          fontSize: '0.85rem',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {book.authors.join(', ').length > 100
                          ? `${book.authors.join(', ').slice(0, 100)}...`
                          : book.authors.join(', ')}
                      </Typography>
                    </CardContent>

                    {/* View Details Button */}
                    <Box sx={{ p: 2 }}>
                      <Button
                        component={Link}
                        to={`/book-details/${book.isbn}`}  // Make sure the link is correctly pointing to the dynamic route
                        variant="contained"
                        size="small"
                        fullWidth
                      >
                        View Details
                      </Button>
                      
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box display="flex" justifyContent="center" mt={4}>
                <Typography variant="h6" color="text.secondary">
                  No books found
                </Typography>
              </Box>
            )}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default BooksList;
