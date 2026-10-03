import { Link } from 'react-router-dom'

function Contact() {
    return (
        <div> 
            <h1>Contact Us</h1>
            <ul>
                <li>Phone: 1234567890</li>
                <li>Email: dmitri.konev@mycit.com</li>
                <li>Student ID: R0****80</li>
            </ul>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default Contact