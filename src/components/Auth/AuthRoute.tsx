import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = any;

export default function AuthRoute(props: Props) {
    const { children } = props
    const auth = getAuth();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setLoading(false);
                navigate('/dashboard');
            } else {
                console.log('unauthorized');
                navigate('/')
            }
            setLoading(false);
        });
    
    return () => unsubscribe();
    }, [auth, navigate]);

    if (loading) return <p>Loading...</p>;

    return <div>{children}</div>;
}
