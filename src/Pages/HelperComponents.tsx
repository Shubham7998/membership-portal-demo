import React from 'react';
import { Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home1: React.FC = () => {
    const rootStyle: React.CSSProperties = {
        marginTop: '2rem',
    };

    const headingStyle: React.CSSProperties = {
        marginBottom: '1.5rem',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'blue', // Change to your desired color
    };

    const quoteTextStyle: React.CSSProperties = {
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: '1rem',
    };

    const authorStyle: React.CSSProperties = {
        textAlign: 'right',
        color: 'green', // Change to your desired color
    };

    const joinButtonStyle: React.CSSProperties = {
        marginTop: '7.5rem',
    };

    const navigate = useNavigate()

    return (
        <Grid container justifyContent="center" alignItems="center" >
            <Container maxWidth="md" style={rootStyle}>
                <Typography variant="h3" style={headingStyle}>
                    Welcome to Our Gym
                </Typography>
                <Typography variant="h5" style={quoteTextStyle}>
                    "The only bad workout is the one that didn't happen."
                </Typography>
                <Typography variant="body1" style={authorStyle}>
                    - Unknown
                </Typography>
            </Container>
        </Grid>
    );
};

export default Home1;
