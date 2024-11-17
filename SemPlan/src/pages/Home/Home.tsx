import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return(
        <div>
            {/* use bracket notation for class names */}
            <h1 className={styles['someClass']}> from Home page </h1>
            <button onClick={() => navigate('/login')}> go to login </button>
        </div>
    )
}