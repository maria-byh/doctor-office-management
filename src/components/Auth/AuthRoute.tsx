import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = any;

export default function AuthRoute(props: Props) {
    const { children } = props
    const auth = getAuth();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);

    useEffect(() => (
        AuthCheck()
    ), [auth]);

    const AuthCheck = onAuthStateChanged(auth, (user)=>{
        if(user) {
            setLoading(false);
        } else {
            console.log('unauthorized');
            navigate('/login')
        }
    })

    if (loading) return <p>loading...</p>
    
    return (
        <div>
            {children}
        </div>
    )
}
