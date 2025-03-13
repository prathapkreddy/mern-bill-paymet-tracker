import { Link } from 'react-router';

export default function SideBar() {
    return <div>
        <div><Link to="/dashboard">Dashboard</Link></div>
        <div><Link to="/credit-cards">Credit Cards</Link></div>
        <div><Link to="/payments">Payments</Link></div>
        <div><Link to="/account">Account</Link></div>
    </div>;
}