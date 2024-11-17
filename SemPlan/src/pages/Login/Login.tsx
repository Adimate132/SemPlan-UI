import styles from './Login.module.scss'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    return(
        <div>
            {/* use bracket notation for class names */}
            <h1 className={styles['someClass']}> from login page </h1>
            <button onClick={() => navigate('/home')}> go home </button>
        </div>
    )
}