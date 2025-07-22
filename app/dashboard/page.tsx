import { Button } from '@/components/ui/button';
import { getHasckServerSession } from '../services/getHasckServerSession';

const DashboardIndex = async () => {
  const { isAuthenticated } = await getHasckServerSession();

  console.log(isAuthenticated);

  return (
    <div>
      <Button>Logout</Button>
    </div>
  );
};

export default DashboardIndex;
