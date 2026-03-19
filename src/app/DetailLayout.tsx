import { Outlet } from 'react-router';
import BackButton from '../shared/ui/BackButton/BackButton';

function DetailLayout() {
    return (
        <div className="relative flex flex-col min-h-screen">
            <div className="absolute top-7 left-7 z-10">
                <BackButton />
            </div>
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}

export default DetailLayout;
