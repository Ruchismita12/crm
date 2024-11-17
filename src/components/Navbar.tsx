import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Users, BarChart2, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) return null;

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-500" />
              <span className="text-white text-xl font-bold">XenoCRM</span>
            </Link>
            <div className="flex space-x-4">
              <NavLink to="/customers" icon={<Users className="h-5 w-5" />} text="Customers" />
              <NavLink to="/campaigns" icon={<MessageSquare className="h-5 w-5" />} text="Campaigns" />
              <NavLink to="/analytics" icon={<BarChart2 className="h-5 w-5" />} text="Analytics" />
            </div>
          </div>
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <Link
    to={to}
    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 hover:bg-gray-700 transition duration-150"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;