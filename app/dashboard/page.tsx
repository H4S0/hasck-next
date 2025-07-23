import { getHasckServerSession } from '../services/getHasckServerSession';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import UpdateEmailForm from '@/components/forms/update-email-form';

const DashboardIndex = async () => {
  const { isAuthenticated } = await getHasckServerSession();

  if (!isAuthenticated) {
    return redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-6 mt-20">
          <UpdateEmailForm />
        </div>
      </main>
    </div>
  );
};

export default DashboardIndex;
