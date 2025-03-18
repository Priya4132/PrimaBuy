import { logout } from '@/redux/actions/authActions';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BannerPage from './BannerPage';

const Home = () => {
    const userId = useSelector((state) => state.auth.userId); 
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleLogout = () => {
        dispatch(logout());
        navigate("/"); // Redirect to home after logout
    };

    return (
      <>
      
        <div>
            {userId ? (
                <Button onClick={handleLogout} ml={"90%"}>Logout</Button>
            ) : (
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
            )}
        </div>
        <BannerPage /> 
        </>
    );
};

export default Home;
