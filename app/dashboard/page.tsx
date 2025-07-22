import { getHasckServerSession } from '../services/getHasckServerSession';
import LogoutButton from '../logout';
import { redirect } from 'next/navigation';

const DashboardIndex = async () => {
  const { isAuthenticated } = await getHasckServerSession();

  if (!isAuthenticated) {
    return redirect('/login');
  }

  return (
    <div>
      <LogoutButton />
    </div>
  );
};

export default DashboardIndex;
