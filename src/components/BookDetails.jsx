import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';

const BookDetails = () => {
  const { isbn } = useParams();  // Get the ISBN from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch book details by ISBN
    axios.get(`https://books-task-production.up.railway.app/api/books/${isbn}`)
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
        setLoading(false);
      });
  }, [isbn]);  // This hook runs when the ISBN changes

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="text.secondary" align="center">
          Book not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
              component="img"
              alt={book.title}
              height="400"
              image={book.thumbnailUrl || "https://via.placeholder.com/400x600?text=No+Image+Available"}  // Fallback image
            />
            <CardContent>
              <Typography variant="h5" component="div" align="center" sx={{ fontWeight: 'bold' }}>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {book.authors && book.authors.length > 0 ? `Author: ${book.authors.join(', ')}` : 'Author: Not available'}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" color="text.primary">
                  <strong>Description:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {book.description || "No description available for this book."}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Additional Details
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Publisher:</strong> {book.publisher || 'Not available'}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Published Date:</strong> {book.publishedDate || 'Not available'}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Page Count:</strong> {book.pageCount || 'Not available'}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Categories:</strong> {book.categories?.join(', ') || 'Not available'}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Optional: Link back to the list page */}
      <Box sx={{ textAlign: 'center', mt: 4, mb:10 }}>
        <Button variant="outlined" href="/" color="primary">
          Back to Book List
        </Button>
      </Box>
    </Container>
  );
};

export default BookDetails;
