import React, { useEffect, useState } from 'react';
import PostFrom from '../components/PostFrom';
import Container from '../components/Container';

export default function AddPost() {

    return (
        <div className='py-8'>
            <Container>
                <PostFrom />
            </Container>
        </div>
    )
}
