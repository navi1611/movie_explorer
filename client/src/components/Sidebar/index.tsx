import { FilmIcon, HomeIcon, LayoutDashboardIcon, TagIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { fetchGenres } from '../../store/slice/Genres';

interface Route {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

const routes: Route[] = [
  { path: '/', label: 'Top Movies', icon: <FilmIcon /> },
  // { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon/> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { genres } = useSelector((state: RootState) => state.genres);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <aside className="h-full w-64 bg-background-secondary border-r  border-border-grey flex flex-col z-50 fade-in-left">
      <div className="p-4 text-primary border-b border-border-grey">
        <h2 className="text-md font-bold">
          Movie Explorer
        </h2>
      </div>

      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-2">
          {routes.map((route) => {
            const isActive = location.pathname === route.path;
            return (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-border-grey text-primary shadow-lg ' : 'text-white '
                    }
                  `}
                >
                  {route.icon && (
                    <span className="text-md">{route.icon}</span>
                  )}
                  <span className="font-medium">{route.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {genres.length > 0 && (
          <>
            <div className="mt-6 mb-2 px-4">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Genres
              </h3>
            </div>
            <ul className="space-y-1">
              {genres.map((genre) => {
                const isActive = location.pathname === `/genre/${genre.id}`;
                return (
                  <li key={genre.id}>
                    <Link
                      to={`/genre/${genre.id}`}
                      className={`
                        flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                        ${isActive
                          ? 'bg-border-grey text-primary shadow-lg ' : 'text-white/80 hover:text-white hover:bg-background-card '
                        }
                      `}
                    >
                      <TagIcon className="text-sm" />
                      <span className="font-medium text-sm">{genre.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </nav>

      <div className="p-4 border-t border-border-grey">
        <p className="text-xs  text-center">
          © 2024 Movie Explorer
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

